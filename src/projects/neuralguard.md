---
title: NeuralGuard
description: An advanced threat detection system that utilizes machine learning models to identify anomalous network traffic patterns.
technologies: [PyTorch, Rust, InfluxDB, React]
github: https://github.com/lucafacchini/neuralguard
---

## Project Overview

NeuralGuard represents the intersection of AI and network security, moving beyond simple rule-based detection to behavioral analysis.

### The Problem

Traditional IDS/IPS systems fail to detect Zero-day exploits because they rely on predefined signatures. NeuralGuard looks for *anomalies* in traffic volume, frequency, and handshake patterns.

![Threat Detection](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2060&auto=format&fit=crop)

### Technical Implementation

- **Data Ingestion**: A Rust-based packet sniffer (libpcap) captures live traffic with minimal latency.
- **Model Training**: An LSTM (Long Short-Term Memory) network trained on the CIC-IDS2017 dataset.
- **Alerting**: Real-time alerts pushed via WebSockets to a React-based security dashboard.
