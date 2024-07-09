# githelper

'githelper' is an extension for VS Code that helps you preventing common problems when handling with Git-repositories. Specially the use of Submodules in a project, when done wrong, can introduce some unintended problems. This extension detects these problems, notifies and assists you with fixes. The fixes can be also applied automatically as soon as the problem is detected.



## Features
It can monitor all folders in current workspace.
ex: code opend "d:\\smallcodes"
   there have
   ``` 
   dir d:\\smallcodes

   project1\
      .git

   project2\
      .git
      .gitmodules

   project3\
      [none GIt]
   ```

Project1 Project2 will be selectd.

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

Initial release of ...

### 0.0.2

Add treeView in SCM

### 0.0.3

add button into  source control bar.

complate command 'pullALL'

### 0.0.4

support restore the submodules.

### 0.0.5

Fix wrong path when restore submoduels

### 0.0.6

Fix resotre submodules command.

### 0.0.7

Release by CI.

### 0.0.8

support update submodules with it's config branch, default is master

### 0.0.9

pull all  just pull , don't update submodules ,later will comeback

### 0.0.10

pull all support pulling all subfolder in  current folder

**Enjoy!**