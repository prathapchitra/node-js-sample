pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'cprathap/node-js-sample:latest'
        K8S_DEPLOYMENT = 'node-app'
        K8S_NAMESPACE = 'default'  // Change if needed
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
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh "kubectl apply -f k8s-manifests/deployment.yaml"
                    sh "kubectl apply -f k8s-manifests/service.yaml"
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    sh "kubectl get pods -n ${K8S_NAMESPACE}"
                }
            }
        }
    }
}
