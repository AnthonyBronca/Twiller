
to deploy to heroku ---

heroku restart && heroku pg:reset DATABASE --confirm appname  && heroku run npm run sequelize db:migrate && heroku run npm run sequelize db:seed:all


to reset db ---

npm run db:reset