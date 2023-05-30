# This script setups whole environment on k8s cluster

# Add Repositories
helm repo add grafana https://grafana.github.io/helm-charts
helm repo add loki https://grafana.github.io/loki/charts
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add nats https://nats-io.github.io/k8s/helm/charts/
helm repo update

# Create APP namespace
kubectl create namespace freelancer

# Add Loki
echo 'Add LOKI'
helm upgrade --install loki --namespace=freelancer grafana/loki-stack


# Add Prometheus
echo 'Add Prometheus'
helm upgrade --install prometheus --namespace=freelancer prometheus-community/prometheus
kubectl expose service prometheus-server --type=LoadBalancer --target-port=9090 --port=8200 --name=prometheus-np --namespace=freelancer

# Add NATS
helm upgrade --install nats --namespace=freelancer nats/nats

# Deploy manifests
kubectl apply -k . --namespace=freelancer
