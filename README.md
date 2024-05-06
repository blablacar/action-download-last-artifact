# GitHub Action: Download last artifact

Downloads the last created artifact by name, regardless of which workflow or branch it was created in.

What is it for? For example:
- You put artifacts in the base branch, and use it in Pull Requests
- Or create artifacts during a release with a tag name in the artifact name.
  Then from the next runs you can download the artifact by name.

## Example usage

```yml
permissions:
  actions: read
  contents: read

steps:
- uses: actions/checkout@v2

- name: Download last artifact
  uses: blablacar/action-download-last-artifact@master
  with:
    name: my-artifact

- name: Display structure of downloaded files
  run: ls -R
```

## Inputs

### `name`

**Required** Artifact name.

### `path`

Optional. Destination path.
By default, the artifact is stored in the current directory.

### `token`

Personal access token (PAT) used to fetch the repository. The PAT is configured
with the local git config, which enables your scripts to run authenticated git
commands. The post-job step removes the PAT.

We recommend using a service account with the least permissions necessary.
Also when generating a new PAT, select the least scopes necessary.

[Learn more about creating and using encrypted secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
