var repl = require('repl'),
    frisk = require('./');

repl.start({
    prompt: "> ",
    eval: function(cmd, context, filename, callback) {
        if (cmd !== "(\n)") {
            cmd = cmd.slice(1, -2); // rm parens and newline added by repl
            var ret = frisk(JSON.parse(cmd));
            callback(null, ret);
        } else {
            callback(null);
        }
    }
});
