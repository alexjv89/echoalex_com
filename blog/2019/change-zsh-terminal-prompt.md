---
title: Change ZSH terminal prompt
layout: layouts/post.ejs
created_at: 2019-11-13
---
# Change ZSH terminal prompt

You can test what prompt you like by running the following command in the terminal – `` `PROMPT='%/ %# '` ``

My preferred basic prompt – `PROMPT='%n@%1~ %# '`. This will give me a prompt that looks like this – `alex.jv@ec2code %`.

In order to make sure this prompt is available on opening new terminal, its needs to be added to profile.

`touch ~/.zshrc` – create – zshrc file

`open ~/.zshrc` – open zshrc file and add `PROMPT='%n@%1~ %# '` to the file.

Ref:

-   [Full supported prompt sequence](http://zsh.sourceforge.net/Doc/Release/Prompt-Expansion.html#Prompt-Expansion)
-   [https://www.freecodecamp.org/news/jazz-up-your-zsh-terminal-in-seven-steps-a-visual-guide-e81a8fd59a38/](https://www.freecodecamp.org/news/jazz-up-your-zsh-terminal-in-seven-steps-a-visual-guide-e81a8fd59a38/)
-   [https://scriptingosx.com/2019/07/moving-to-zsh-06-customizing-the-zsh-prompt/](https://scriptingosx.com/2019/07/moving-to-zsh-06-customizing-the-zsh-prompt/)
-   [https://medium.com/@ajaykarwal/edit-the-terminal-prompt-name-on-macos-4d80163be6a1](https://medium.com/@ajaykarwal/edit-the-terminal-prompt-name-on-macos-4d80163be6a1)