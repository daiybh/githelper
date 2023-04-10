# githelper

'githelper' is an extension for VS Code that helps you preventing common problems when handling with Git-repositories. Specially the use of Submodules in a project, when done wrong, can introduce some unintended problems. This extension detects these problems, notifies and assists you with fixes. The fixes can be also applied automatically as soon as the problem is detected.



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