var dbConfig = require('../../server/config/connection')
var knex = require('knex')
var app = require('../../server/app')
var request = require('supertest')(app)
var User = require('../../server/models/user')
var createUser = require('../../server/lib/create_user');
var createAdmin = require('../../server/lib/create_admin');

function truncateAll(knex) {
  var sql = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public';"
  return dbConfig.surveys.knex.raw(sql).then(function (response) {
    var tableNames = response.rows.map(function(row){ return row.tablename })
    return dbConfig.surveys.knex.raw('TRUNCATE ' + tableNames.join() + ' CASCADE');
  })
}

describe("csv", function() {
    it("should not allow a non admin user to request a CSV ", function(done) {
      request.get('/api/v1/admin/surveys/csv?sid=7&sid=8&q7=lone-q1&q8=dprs-q1&include=first')
        .send()
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
});


describe("Authenticated admins", function() {
  var authCookies;
  createAdmin('t@testing.com', 'password123');
  beforeEach(function(done) {
      request.post('/api/v1/users/signin')
        .send({username: 't@testing.com', password: 'password123'})
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          authCookies = res.headers['set-cookie'].map(function(cookie) {
            return cookie.split(';')[0];
          }).join(';');
          done();
        });
  });

  it('will allow admins to request CSV', function(done){
      request.get('/api/v1/admin/surveys')
      .set('Cookie', authCookies)
      .send()
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  
});
