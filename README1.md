# githelper README

This is the README for your extension "githelper". After writing up a brief description, we recommend including the following sections.

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


## init Extension

## add commands

   - [X] listALLSubmodule

   - [] restoreSubmodule

      when we clone[use git cmd] one project from remote, this project with submodule,but we need restore it.

   ``` bash restoreSubmodule

      git config -f .gitmodules --get-regexp '^submodule\..*\.path$' |
	while read path_key path
	do
		url_key=$(echo $path_key | sed 's/\.path/.url/')
		url=$(git config -f .gitmodules --get "$url_key")
		git submodule add $url $path
	done

   ```
     

   - [] pullALLCommand

      update all [git] include submodules to HEAD.

## add status bar.




# scripts

All scripts

``` bash restoreSubmodule

      git config -f .gitmodules --get-regexp '^submodule\..*\.path$' |
	while read path_key path
	do
		url_key=$(echo $path_key | sed 's/\.path/.url/')
		url=$(git config -f .gitmodules --get "$url_key")
		git submodule add $url $path
	done

```



https://stackoverflow.com/questions/17714159/how-do-i-undo-a-single-branch-clone

``` bash how-do-i-undo-a-single-branch-clone

   git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
   git fetch origin
```


get submoudle branchs

```
 git config --file .gitmodules --get-regex branch
```