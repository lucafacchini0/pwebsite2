---
title: Vault Architecture
description: A reference architecture for building 'Zero Trust' backend systems focusing on granular access control and end-to-end encryption.
technologies: [Kubernetes, gRPC, HashiCorp Vault, Istio]
github: https://github.com/lucafacchini/vault-arch
---

## Project Overview

Vault Architecture is a blueprint for securing modern microservices. It assumes that the network is already compromised and focuses on protecting the data at every layer.

### Core Principles

1. **Never Trust, Always Verify**: Every request is authenticated and authorized.
2. **Least Privilege**: Only the minimum required permissions are granted.
3. **Encrypt Everything**: Both in transit (mTLS) and at rest.

![Security Layer](https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop)

### Implementation Detail

The system uses **Istio Service Mesh** to manage mTLS certificates automatically. **HashiCorp Vault** handles secret management, rotating service account credentials every 24 hours.
