# Example usage of nemo automation framework + browserstack

Install dependencies from within this directory `npm install`

## Run against a local browser

```shell
$ node nemo.js
```

## Run in the browserstack cloud

Set browserstack environment variables as in the below shell example

```shell
$ export BSTK_USER=myusername1
$ export BSTK_KEY=aa4235ssdda
$ export BSTK_BROWSER=chrome
$ export BSTK_VERSION=22.0
```

Run node command with NODE_ENV=browserstack to engage the `browserstack.json` override

```shell
$ NODE_ENV=browserstack node nemo.js
```

## For more information on nemo

Go to https://nemo.js.org