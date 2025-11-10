C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app>node -v
v24.11.0

C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app>npm -v
11.6.1

C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app>npm i underscore

added 1 package, and audited 2 packages in 2s

found 0 vulnerabilities

C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app>node index.js
true

C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app>npm i mongoose

added 19 packages, and audited 21 packages in 4s

1 package is looking for funding
  run `npm fund` for details

found 0 vulnerabilities

C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app>ls node_modules/
'ls' is not recognized as an internal or external command,
operable program or batch file.

C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app>git init
Initialized empty Git repository in C:/Users/SriniAchuthan/OneDrive/Desktop/Node.JS/first_app/.git/

C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app>git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        app.js
        app1.js
        creation.js
        example.txt
        index.js
        logger.js
        node1.js
        node_modules/
        pack.js
        package-lock.json
        package.json
        path.js
        test.js
        wrapper.js

nothing added to commit but untracked files present (use "git add" to track)

C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app>git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore
        app.js
        app1.js
        creation.js
        example.txt
        index.js
        logger.js
        node1.js
        pack.js
        package-lock.json
        package.json
        path.js
        test.js
        wrapper.js

nothing added to commit but untracked files present (use "git add" to track)

C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app>git commit -m "Our first commit"
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore
        app.js
        app1.js
        creation.js
        example.txt
        index.js
        logger.js
        node1.js
        pack.js
        package-lock.json
        package.json
        path.js
        test.js
        wrapper.js

nothing added to commit but untracked files present (use "git add" to track)

C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app>npm list --depth=0
C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app
+-- @mongodb-js/saslprep@1.3.2 extraneous
+-- @types/webidl-conversions@7.0.3 extraneous
+-- @types/whatwg-url@11.0.5 extraneous
+-- bson@6.10.4 extraneous
+-- debug@4.4.3 extraneous
+-- kareem@2.6.3 extraneous
+-- memory-pager@1.5.0 extraneous
+-- mongodb-connection-string-url@3.0.2 extraneous
+-- mongodb@6.20.0 extraneous
+-- mongoose@8.19.3 extraneous
+-- mpath@0.9.0 extraneous
+-- mquery@5.0.0 extraneous
+-- ms@2.1.3 extraneous
+-- punycode@2.3.1 extraneous
+-- sift@17.1.3 extraneous
+-- sparse-bitfield@3.0.3 extraneous
+-- tr46@5.1.1 extraneous
+-- underscore@1.13.7 extraneous
+-- webidl-conversions@7.0.0 extraneous
`-- whatwg-url@14.2.0 extraneous

npm error code EJSONPARSE
npm error JSON.parse Failed to parse root package.json
npm error JSON.parse Failed to parse JSON data.
npm error JSON.parse Note: package.json must be actual JSON, not just JavaScript.
npm error A complete log of this run can be found in: C:\Users\SriniAchuthan\AppData\Local\npm-cache\_logs\2025-11-10T07_37_57_379Z-debug-0.log

C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app>npm view mongoose dependencies
{
  bson: '^6.10.4',
  kareem: '2.6.3',
  mongodb: '~6.20.0',
  mpath: '0.9.0',
  mquery: '5.0.0',
  ms: '2.1.3',
  sift: '17.1.3'
}

C:\Users\SriniAchuthan\OneDrive\Desktop\Node.JS\first_app>npm view mongoose versions
[
  '0.0.1',     '0.0.2',     '0.0.3',        '0.0.4',        '0.0.5',
  '0.0.6',     '1.0.0',     '1.0.1',        '1.0.2',        '1.0.3',
  '1.0.4',     '1.0.5',     '1.0.6',        '1.0.7',        '1.0.8',
  '1.0.10',    '1.0.11',    '1.0.12',       '1.0.13',       '1.0.14',
  '1.0.15',    '1.0.16',    '1.1.0',        '1.1.1',        '1.1.2',
  '1.1.3',     '1.1.4',     '1.1.5',        '1.1.6',        '1.1.7',
  '1.1.8',     '1.1.9',     '1.1.10',       '1.1.11',       '1.1.12',
  '1.1.13',    '1.1.14',    '1.1.15',       '1.1.16',       '1.1.17',
  '1.1.18',    '1.1.19',    '1.1.20',       '1.1.21',       '1.1.22',
  '1.1.23',    '1.1.24',    '1.1.25',       '1.2.0',        '1.3.0',
  '1.3.1',     '1.3.2',     '1.3.3',        '1.3.4',        '1.3.5',
  '1.3.6',     '1.3.7',     '1.4.0',        '1.5.0',        '1.6.0',
  '1.7.2',     '1.7.3',     '1.7.4',        '1.8.0',        '1.8.1',
  '1.8.2',     '1.8.3',     '1.8.4',        '2.0.0',        '2.0.1',
  '2.0.2',     '2.0.3',     '2.0.4',        '2.1.0',        '2.1.1',
  '2.1.2',     '2.1.3',     '2.1.4',        '2.2.0',        '2.2.1',
  '2.2.2',     '2.2.3',     '2.2.4',        '2.3.0',        '2.3.1',
  '2.3.2',     '2.3.3',     '2.3.4',        '2.3.5',        '2.3.6',
  '2.3.7',     '2.3.8',     '2.3.9',        '2.3.10',       '2.3.11',
  '2.3.12',    '2.3.13',    '2.4.0',        '2.4.1',        '2.4.2',
  '2.4.3',     '2.4.4',     '2.4.5',        '2.4.6',        '2.4.7',
