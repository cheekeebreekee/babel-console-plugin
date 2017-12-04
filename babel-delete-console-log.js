"use strict";

module.exports =  function({ types: t }) {
    return {
        name: "babel-delete-console-log",
        visitor: {
            CallExpression(path, state) {
                const callee = path.get("callee");

                if (!callee.isMemberExpression()) return;

                if (isConsoleLog(callee)) {
                    if (path.parentPath.isExpressionStatement()) {
                        path.remove();
                    }
                }
            }
        }
    };

    function isConsoleLog(memberExpr) {
        const object = memberExpr.get("object");
        const property = memberExpr.get("property");
        return (
            object.isIdentifier({ name: "console" }) && property.isIdentifier({ name: "log" })
        );
    }
};
