pipeline {
    agent any
    triggers {
        githubPush()
    }
    environment {
        MONGODB_ENV_URI=''
        NODE_ENV='test'
        SESSION_SECRET='topSecret'
    }
      stages {
          stage('build') {
              steps {
                  echo 'Starting build and installing packages'
                  sh 'cd auth && npm install'
                  sh 'cd client && npm install'
                  sh 'cd orders && npm install'
                  sh 'cd tickets && npm install'
              }
          }
          stage('test') {
              steps {
                  echo 'Running test cases'
                  sh 'cd orders && npm run test:prod'
              }
          }
          stage('coverage') {
              steps {
                  echo 'Checking the code coverage'
                  sh 'cd orders && npm run test:prod -- --coverage'
              }
          }
      }
}
