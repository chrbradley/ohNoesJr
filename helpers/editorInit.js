var editor = ace.edit("editor");

editor.$blockScrolling = Infinity;
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
editor.getSession().setTabSize(4);
editor.getSession().setUseSoftTabs(true);
editor.getSession().setUseWrapMode(true);
editor.getSession().setWrapLimitRange(80, 80);
