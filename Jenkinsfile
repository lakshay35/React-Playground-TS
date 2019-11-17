pipeline {
  environment {
    FAILED_STAGE = ""
  }
  agent any

  stages {
    stage('Some Step') {
      steps {
        script {
          try {
            echo 'Hello world'
          } catch (e) {
            FAILED_STAGE = "Some Step"
            error "Failed Build"
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
            error "Failed Build"
          }
        }
      }
    }
  }

  post {
    success {
      sendSlackMessage('react-portal', "SUCEEDED ${FAILED_STAGE}: Job: '${env.BUILD_TAG} (${env.BUILD_URL})' on node ${env.NODE_NAME}", '#0d9e0d')
    }
    failure {
      sendSlackMessage('react-portal', "FAILED ${FAILED_STAGE}: Job: '${env.BUILD_TAG} (${env.BUILD_URL})' on node ${env.NODE_NAME}", '#FF0000')
    }
    
    fixed {
      sendSlackMessage('react-portal', "FIXED: Job: '${env.BUILD_TAG}(${env.BUILD_URL})' on node ${env.NODE_NAME}", '##0d9e0d')
    }

    aborted {
      sendSlackMessage('react-portal', "ABORTED: Job: '${env.BUILD_TAG} (${env.BUILD_URL})' on node ${env.NODE_NAME}", '#FFFF00')
    }

    unstable {
      sendSlackMessage('react-portal', "UNSTABLE: Job: '${env.BUILD_TAG} (${env.BUILD_URL})' on node ${env.NODE_NAME}", '#FFFF00')
    }

    unsuccessful {
      sendSlackMessage('react-portal', "UNSUCCESSFUL: Job: '${env.BUILD_TAG} (${env.BUILD_URL})' on node ${env.NODE_NAME}", '#FFFF00')
    }
  } 

}


def sendDiscordMessage(String description, String footer) {
  discordSend(description: description, footer: footer, link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discordapp.com/api/webhooks/645399067563786257/nXSp4TL16ija8nCO1_Ji9XFJZc6tQJF0-J1ju0MbNo0CprC_gcDSDKrKBcwMOnreW4qR")
}