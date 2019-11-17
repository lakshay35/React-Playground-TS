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
    success {
      sendDiscordMessage("Jenkins Pipeline Succeeded", "Footer Text")
      sendSlackMessage('react-portal', "FAILED ${FAILED_STAGE}: Job: '${env.BUILD_TAG} (${env.BUILD_URL})' on node ${env.NODE_NAME}", '#0d9e0d')
    }
    failure {
      sendDiscordMessage("Jenkins Pipeline Failed", "Footer Text")
      sendSlackMessage('react-portal', "FAILED ${FAILED_STAGE}: Job: '${env.BUILD_TAG} (${env.BUILD_URL})' on node ${env.NODE_NAME}", '#FF0000')
    }
    
    fixed {
      sendDiscordMessage("Jenkins Pipeline Fixed", "Footer Text")
      sendSlackMessage('react-portal', "FIXED: Job: '${env.BUILD_TAG}(${env.BUILD_URL})' on node ${env.NODE_NAME}", '##0d9e0d')
    }

    aborted {
      sendDiscordMessage("Jenkins Pipeline Aborted", "Footer Text")
      sendSlackMessage('react-portal', "ABORTED: Job: '${env.BUILD_TAG} (${env.BUILD_URL})' on node ${env.NODE_NAME}", '#FFFF00')
    }

    unstable {
      sendDiscordMessage("Jenkins Pipeline Unstable", "Footer Text")
      sendSlackMessage('react-portal', "UNSTABLE: Job: '${env.BUILD_TAG} (${env.BUILD_URL})' on node ${env.NODE_NAME}", '#FFFF00')
    }

    unsuccessful {
      sendDiscordMessage("Jenkins Pipeline Unsuccessful", "Footer Text")
      sendSlackMessage('react-portal', "UNSUCCESSFUL: Job: '${env.BUILD_TAG} (${env.BUILD_URL})' on node ${env.NODE_NAME}", '#FFFF00')
    }
  } 

}

def sendSlackMessage(String channel, String message, String color) {
  slackSend(channel: channel, message: message, color: color)
}


def sendDiscordMessage(String description, String footer) {
  discordSend(description: description, footer: footer, link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discordapp.com/api/webhooks/645399067563786257/nXSp4TL16ija8nCO1_Ji9XFJZc6tQJF0-J1ju0MbNo0CprC_gcDSDKrKBcwMOnreW4qR")
}