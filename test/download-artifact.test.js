const DownloadArtifact = require('../lib/download-artifact')
const { resolve } = require('path')
const github = require('@actions/github')

const testif = (condition) => condition ? test : test.skip

describe('test getAbsolutePath()', () => {
    let downloadArtifact

    beforeAll(() => {
        downloadArtifact = new DownloadArtifact('', '')
    })

    test('expect current dir if path is empty', () => {
        expect(downloadArtifact.getAbsolutePath('')).toBe(resolve())
    })

    test('expect current dir if path is dot', () => {
        expect(downloadArtifact.getAbsolutePath('.')).toBe(resolve())
    })

    test('expect dir in current dir if path is dir1', () => {
        expect(downloadArtifact.getAbsolutePath('dir1')).toBe(resolve('dir1'))
    })

    test('expect home dir if path is ~', () => {
        expect(downloadArtifact.getAbsolutePath('~')).toBe(process.env['HOME'])
    })

    test('expect home dir if path is ~/.', () => {
        expect(downloadArtifact.getAbsolutePath('~/.')).toBe(process.env['HOME'])
    })

    test('expect dir in home dir if path is ~/dir1', () => {
        expect(downloadArtifact.getAbsolutePath('~/dir1')).toBe(process.env['HOME'] + '/dir1')
    })

    test('expect root dir if path is /', () => {
        expect(downloadArtifact.getAbsolutePath('/')).toBe('/')
    })

    test('expect dir in root if path is /dir1', () => {
        expect(downloadArtifact.getAbsolutePath('/dir1')).toBe('/dir1')
    })
})

describe('test getLastArtifactIdByName()', () => {
    let downloadArtifact

    beforeAll(() => {
        downloadArtifact = new DownloadArtifact('', '')
        downloadArtifact.repository = {
            owner: getOwner() || 'blablacar',
            repo: getRepository() || 'action-download-last-artifact'
        }
        if (getToken()) {
            downloadArtifact.client = github.getOctokit(getToken())
        }
    })

    testif(getToken())('expect zero if artifact exists', async () => {
        expect(await downloadArtifact.getLastArtifactIdByName('blablabla')).toBe(0)
    })

    testif(getToken())('expect any atifact Id', async () => {
        expect(await downloadArtifact.getLastArtifactIdByName('artifact')).toBeGreaterThan(0)
    })
})

function getToken() {
    return process.env['GITHUB_TOKEN'] || ''
}

function getOwner() {
    return process.env['GITHUB_OWNER'] || ''
}

function getRepository() {
    return process.env['GITHUB_REPO'] || ''
}
