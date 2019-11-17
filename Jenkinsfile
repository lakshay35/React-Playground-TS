pipeline {

  environment {
    registry = "908173109448.dkr.ecr.us-east-2.amazonaws.com/personal"
    registryCredential = 'ECR'
  }

  agent any
  stages {
    try {
      stage('Building image') {
        steps{
          script {
            docker.build registry + ":$BUILD_NUMBER"
          }
        }
      }
    } catch (e) {
      // If there was an exception thrown, the build failed
      currentBuild.result = "FAILED"
      throw e
    } finally {
      // Success or failure, always send notifications
      notifyBuild(currentBuild.result)
    }
  }
   
}
def notifyBuild(String buildStatus = 'STARTED') {
    // build status of null means successful
    buildStatus =  buildStatus ?: 'SUCCESSFUL'

    // Default values
    def colorName = 'RED'
    def colorCode = '#FF0000'
    def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
    def summary = "${subject} (${env.BUILD_URL})"

    // Override default values based on build status
    if (buildStatus == 'STARTED') {
      color = 'YELLOW'
      colorCode = '#FFFF00'
    } else if (buildStatus == 'SUCCESSFUL') {
      color = 'GREEN'
      colorCode = '#00FF00'
    } else {
      color = 'RED'
      colorCode = '#FF0000'
    }

    // Send notifications
    slackSend (color: colorCode, message: summary)
  }
