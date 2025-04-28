pipeline {
    agent any

    environment {
        IMAGE_NAME = 'cprathap/node-js-sample'
        VERSION = "v1.0.${BUILD_NUMBER}"
        DOCKER_IMAGE = "${IMAGE_NAME}:${VERSION}"
        LATEST_IMAGE = "${IMAGE_NAME}:latest"
        K8S_DEPLOYMENT = 'node-app'
        K8S_NAMESPACE = 'default'
        RECIPIENTS = 'youremail@example.com' // Replace with your actual email if needed
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/prathapchitra/node-js-sample.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        docker build -t ${DOCKER_IMAGE} -t ${LATEST_IMAGE} .
                    """
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                        sh """
                            docker push ${DOCKER_IMAGE}
                            docker push ${LATEST_IMAGE}
                        """
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                        sed -i 's|image: .*|image: ${DOCKER_IMAGE}|' k8s-manifests/deployment.yaml
                        kubectl apply -f k8s-manifests/deployment.yaml
                        kubectl apply -f k8s-manifests/service.yaml
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                sh "kubectl get pods -n ${K8S_NAMESPACE}"
            }
        }
    }
}
