## fastlane documentation

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios sync_certs

```sh
[bundle exec] fastlane ios sync_certs
```

Get certificates

### ios generate_new_certs_dev

```sh
[bundle exec] fastlane ios generate_new_certs_dev
```

Generate new development certificates

### ios generate_new_certs_appstore

```sh
[bundle exec] fastlane ios generate_new_certs_appstore
```

Generate new appstore certificates

### ios bump

```sh
[bundle exec] fastlane ios bump
```

### ios set_version_number

```sh
[bundle exec] fastlane ios set_version_number
```

### ios build_beta

```sh
[bundle exec] fastlane ios build_beta
```

### ios upload_beta

```sh
[bundle exec] fastlane ios upload_beta
```

---

## Android

### android buildApk

```sh
[bundle exec] fastlane android buildApk
```

### android buildBundle

```sh
[bundle exec] fastlane android buildBundle
```

---

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
