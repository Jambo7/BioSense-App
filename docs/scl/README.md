# SCL packs (Neil / BioSense Scientific Authoring)

Source scientific configuration packs **SCL-001 … SCL-024** live here as
provenance copies. The engine does **not** read the markdown at runtime.

Machine-readable claims are generated into `lib/bio-engine/csl-data/` by:

```bash
node scripts/import-scl-packs.mjs
node scripts/patch-scl-thresholds.mjs   # fills bands the regex missed
```

Re-run after Neil drops updated packs into `Downloads/SCI Documents`.
