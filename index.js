!function ( window, document, call ) {
    const _initer = (window 
        && typeof window == "object" 
        && window instanceof Object) ? true : undefined;
    if (_initer) {
        const _initerDocument = (window.document 
            && typeof window.document == "object" 
            && window.document instanceof Object) ? true : undefined;
        if (_initerDocument) {
            if (call && typeof call == "function") {
                call ();
            }
        }
    } 
} ( window, document,
    function () {
        var node = document.createElement ('style'); 
        const textnode = document.createTextNode ('wrapper { display: none; }'); 
        node.appendChild (textnode); 
        document.head.appendChild (node);
        function init_unit ($) {
            $(document).ready (function () {
                ( async function () {
                    var reslut = await "";
                    $("wrapper").each (function () {
                        if ( $(this).attr ("type") == "html" ) {
                            var str = $(this).html ()?.trim ();
                            str = str.replace(/'/g, "\\'");
                            str = str.replace(/`/g, "\\'");
                            str = str.replace(/"/g, "\\'");
                            var backtics = "`"+str+"`";
                            var createStrF = `( function (window, document, caller) {
                                    if (window || typeof window == "object") {
                                        if ( window.document || typeof window.document == "object" ) {
                                            if (window.document.body != undefined) {
                                                try { caller (); } catch (e) { throw e; };
                                            } 
                                        } 
                                    } 
                                }) (window, document, function () {
                                    try { document.body.innerHTML = ${backtics}; } catch (e) { throw e; }
                                });
                            `;
                            reslut += createStrF?.trim (); 
                        } 
                        if ( $(this).attr ("type") == "css" ) {
                            var str = $(this).html ()?.trim ();
                            str = str.replace(/'/g, "\\'");
                            str = str.replace(/`/g, "\\'");
                            str = str.replace(/"/g, "\\'");
                            var backtics = "`"+str+"`";
                            var createStrF = `
                                ( function (window, document, caller) {
                                    if (window || typeof window == "object") {
                                        if ( window.document || typeof window.document == "object" ) {
                                            if (window.document.body != undefined) {
                                                try {
                                                    caller ();
                                                } catch (error) {
                                                    throw error;
                                                };
                                            }
                                        }
                                    }
                                }) (window, document, function () {
                                    try {
                                        const node = document.createElement ('style'); 
                                        const textnode = document.createTextNode (${backtics}); 
                                        node.appendChild (textnode); 
                                        document.head.appendChild (node);
                                    } catch (err) {
                                        throw err;
                                    }; 
                                });
                            `;
                            reslut += createStrF?.trim ();
                        } 
                    });
                    if (reslut) {
                        if (!window.Babel) {
                            fetch ("https://unpkg.com/@babel/standalone/babel.min.js"). then (function (res) {
                                return res.text ();
                            }).then (function (babelCDN) {
                                eval (babelCDN);
                                var babel_result = Babel.transform (reslut?.trim (), { presets: ['es2015'] });
                                console.log (babel_result.code);
                            }). catch (function (error) {
                                console.log (reslut); 
                            });
                        } else {
                            console.log (reslut); 
                        }
                    }
                })();
            });
        }
        if ( window.$ && window.$ instanceof Function || window.$ instanceof Object && typeof window.$ == "function" ) {
            init_unit (window.$);
        } else {
            var cdn = "https://code.jquery.com/jquery-3.7.0.min.js";
            fetch (cdn).then (j=> j.text ()).then (
                async (jQuery)=> {
                    await eval (jQuery);
                    if ( window.$ && window.$ instanceof Function || window.$ instanceof Object && typeof window.$ == "function" ) {
                        await init_unit (window.$);
                    }
                }
            );
        }
    }
);