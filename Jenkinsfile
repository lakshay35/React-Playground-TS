pipeline {

  agent any

  def FAILED_STAGE

  stages {
    stage('Some Step') {
      steps {
        script {
          try {
            echo 'Hello world'
          } catch (e) {
            FAILED_STAGE = "Some Step"
          }
        }
      }
    }

    stage('Docker Image Build') {
      steps{
        script {
          try {
            docker.build registry + ":$BUILD_NUMBER"
          } catch (e) {
            FAILED_STAGE = "Docker Image Build"
          }
        }
      }
    }
  }

  post {
    failure {
      discordSend description: "Jenkins Pipeline Failed", footer: "Footer Text", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discordapp.com/api/webhooks/645399067563786257/nXSp4TL16ija8nCO1_Ji9XFJZc6tQJF0-J1ju0MbNo0CprC_gcDSDKrKBcwMOnreW4qR"
      slackSend(channel: 'react-portal', message: "FAILED ${FAILED_STAGE}: Job: '${env.BUILD_TAG} (${env.BUILD_URL})' on node ${env.NODE_NAME}", color: '#FF0000')
    }
    
    fixed {
      discordSend description: "Jenkins Pipeline Fixed", footer: "Footer Text", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discordapp.com/api/webhooks/645399067563786257/nXSp4TL16ija8nCO1_Ji9XFJZc6tQJF0-J1ju0MbNo0CprC_gcDSDKrKBcwMOnreW4qR"
      slackSend(channel: 'react-portal', message: "Back to normal: Job: '${env.BUILD_TAG}(${env.BUILD_URL})' on node ${env.NODE_NAME}", color: '#FF0000')
    }

    aborted, unstable, unsuccessful {
      discordSend description: "Jenkins Pipeline Aborted/Unstable/Unsuccessful", footer: "Footer Text", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discordapp.com/api/webhooks/645399067563786257/nXSp4TL16ija8nCO1_Ji9XFJZc6tQJF0-J1ju0MbNo0CprC_gcDSDKrKBcwMOnreW4qR"
      slackSend(channel: 'react-portal', message: "ABORTED: Job: '${env.BUILD_TAG} (${env.BUILD_URL})' on node ${env.NODE_NAME}", color: '#FFFF00')
    }
  } 

}