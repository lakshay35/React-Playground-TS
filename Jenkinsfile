pipeline {

  agent any

  stages {
    stage('Some Step') {
      steps {
        script {
          slacksend(channel: 'react-portal', message: "SUCCEEDED: Jobs '${env.JOB_NAME} [${env.BUILD_NUMBER}] (${env.BUILD_URL})' ", color: '#FFFF00')
          echo 'Hello world'
          slacksend(channel: 'react-portal', message: "SUCCEEDED: Jobs '${env.JOB_NAME} [${env.BUILD_NUMBER}] (${env.BUILD_URL})' ", color: '#00FF00')
        }
      }
    }

    stage('Docker Image Build') {
      steps{
        script {
          slacksend(channel: 'react-portal', message: "STARTED: Jobs '${env.JOB_NAME} [${env.BUILD_NUMBER}] (${env.BUILD_URL})' ", color: '#FFFF00')
          docker.build registry + ":$BUILD_NUMBER"
          slacksend(channel: 'react-portal', message: "SUCCEEDED: Jobs '${env.JOB_NAME} [${env.BUILD_NUMBER}] (${env.BUILD_URL})' ", color: '#00FF00')
        }
      }
    }
  }

  post {
    failure {
      slacksend(channel: 'react-portal', message: "FAILED: Jobs '${env.JOB_NAME} [${env.BUILD_NUMBER}] (${env.BUILD_URL})' ", color: '#FF0000')
    }
  } 
  
}