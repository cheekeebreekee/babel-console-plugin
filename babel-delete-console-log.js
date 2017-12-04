"use strict";

function isConsoleLog(expression) {
    const obj = expression.get("object");
    const prop = expression.get("property");
    return (
        obj.isIdentifier({ name: "console" }) && prop.isIdentifier({ name: "log" })
    );
}

module.exports = function({ types: t }) {
    return {
        name: "babel-delete-console-log",
        visitor: {
            CallExpression(path, state) {
                const callee = path.get("callee");

                if (!callee.isMemberExpression()) return;

                if (isConsoleLog(callee) === true) {
                    if (path.parentPath.isExpressionStatement()) {
                        path.remove();
                    }
                }
            }
        }
    };
};
