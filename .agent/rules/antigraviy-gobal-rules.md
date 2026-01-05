---
trigger: always_on
---

1. Exclude directories from scanning and analysis
Do not scan or analyze any resources located in the following directories:
- /docker-volumes
- /.vs
- /assets/imgs

2. Apply rules using the nearest nested configuration
When multiple rule definitions exist, always apply the rules defined in the closest (nearest) parent directory.
Nested rules take precedence over higher-level (global) rules.