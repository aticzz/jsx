!function ( window, document, caller ) {
    const condWindow = window && 
        typeof window === "object" &&  window instanceof Object === true
    if (condWindow) {
        const condDocument = document && 
            typeof document === "object" &&  document instanceof Object === true
        if (condDocument) {
            if ( caller && typeof caller === "function" ) {
                if (document.readyState === "loading") {
                    document.addEventListener ("DOMContentLoaded", caller);
                } else {
                    caller ();
                }
            }
        } else { 
            console.warn ("document Object Not Found"); 
        }
    } else {
        console.warn ("window Object Not Found");
    }
} (window, window.document, function () {
    if (!window && !window.document && !document) { return undefined; }
    ( async function () {
        const stringToBinary = function (input) {
            let characters = input.split ('');
            return characters.map ( function (char) {
                const binary = char.charCodeAt (0).toString (2);
                const pad = Math.max (8 - binary.length, 0);
                return '0'.repeat (pad) + binary;
            }).join ('');
        };
        const AllWrapperElements = document.querySelectorAll ("wrapper");
        const checkWrapper = document.getElementById ("wrapper-cdn");
        if (!checkWrapper) { console.warn ("Please Set Attribute of this cdn id='wrapper-cdn' "); return undefined; }
        if (AllWrapperElements && AllWrapperElements.length > 0) {
            let indexCount = 0;
            AllWrapperElements.forEach (async function (element, index, array) {
                element.setAttribute ("index", indexCount);
                element.setAttribute ("style", "display: none;");
                indexCount++;
            });
            const initData = [];
            AllWrapperElements.forEach (async function (element, index, array) {
                const getAttr = element.getAttribute ("type");
                if (getAttr && typeof getAttr == "string") {
                    const attrLowerStr = getAttr.toLocaleLowerCase ();
                    const attrIndex = parseInt (element.getAttribute ("index"));
                    if (attrLowerStr == "css") {
                        const isHref = element.getAttribute ("href");
                        if (isHref && typeof isHref == "string") {
                            const xhr = new XMLHttpRequest ();
                            xhr.onreadystatechange = async function() {
                                if (xhr.readyState == XMLHttpRequest.DONE) {
                                    const dataObject = { index: attrIndex, data: xhr.responseText, type: attrLowerStr };
                                    initData.push (dataObject);
                                }
                            }
                            xhr.open ('GET', isHref, true);
                            xhr.send (null);
                        } else {
                            const dataObject = { index: attrIndex, data: element.innerText, type: attrLowerStr };
                            initData.push (dataObject);
                        }
                    }
                    if (attrLowerStr == "html") {
                        const dataObject = { index: attrIndex, data: element.innerHTML, type: attrLowerStr };
                        initData.push (dataObject);
                    }
                    if (attrLowerStr == "javascript" || attrLowerStr == "js") {
                        const isSrc = element.getAttribute ("src");
                        if (isSrc && typeof isSrc == "string") {
                            const xhr = new XMLHttpRequest ();
                            xhr.onreadystatechange = async function() {
                                if (xhr.readyState == XMLHttpRequest.DONE) {
                                    const dataObject = { index: attrIndex, data: xhr.responseText, type: attrLowerStr };
                                    initData.push (dataObject);
                                }
                            }
                            xhr.open ('GET', isSrc, true);
                            xhr.send (null);
                        } else {
                            const dataObject = { index: attrIndex, data: element.innerText, type: attrLowerStr };
                            initData.push (dataObject);
                        }
                    }
                } else {
                    console.warn ("add Attribute [type] and value should be either a html or css or javascript or js");
                }
            });
            try {
                
                const initController = function  () {
                    try {
                    const isInterval = setInterval ( function () {
                        if (initData.length == indexCount) {
                            ( function initClearInterval (clr) {
                                clearInterval (clr);
                            }) (isInterval);
                            const assembleData = [];
                            for ( const indexKey in initData ) {
                                const dataObject = initData [indexKey];
                                assembleData [dataObject.index] = { 
                                    data: dataObject.data,
                                    type: dataObject.type
                                };
                            }
                            const refererJSON = JSON.stringify (assembleData);
                            const initJSdocs = `
                                !function ( window, document, caller ) {
                                    const condWindow = window && 
                                        typeof window === "object" &&  window instanceof Object === true
                                    if (condWindow) {
                                        const condDocument = document && 
                                            typeof document === "object" &&  document instanceof Object === true
                                        if (condDocument) {
                                            if ( caller && typeof caller === "function" ) {
                                                caller ();
                                            }
                                        } else { 
                                            console.warn ("document Object Not Found"); 
                                        }
                                    } else {
                                        console.warn ("window Object Not Found");
                                    }
                                } (window, window.document, function () {
                                    if (!window && !window.document && !document) { return undefined; }
                                    ( function () {
                                        const refererJSON = ${refererJSON};
                                        if (refererJSON && typeof refererJSON == "object") {
                                            ( function generateStyle () {
                                                const head = document.head || document.getElementsByTagName('head') [0];
                                                const style = document.createElement ('style');
                                                style.setAttribute ("type", 'text/css');
                                                style.setAttribute ("id", 'html-css-wrapper-style');
                                                head.appendChild (style);
                                            }) ();
                                            function insertCSS (Element, CSS) {
                                                if (Element.styleSheet) {
                                                    Element.styleSheet.cssText = CSS;
                                                } else {
                                                    Element.appendChild(document.createTextNode(CSS));
                                                }
                                            };
                                            for (const obj of refererJSON) {
                                                if (obj && typeof obj == "object") {
                                                    const data = obj.data?.trim ();
                                                    const type = obj.type?.trim ();
                                                    if (data && typeof data == "string" && type && typeof type == "string") {
                                                        const lowerType = type.toLocaleLowerCase ();
                                                        if (lowerType == "css") {
                                                            const getSTYLE = document.getElementById ("html-css-wrapper-style");
                                                            if (getSTYLE || typeof getSTYLE == "object") {
                                                                insertCSS (getSTYLE, data);
                                                            }
                                                        }
                                                        if (lowerType == "html") {
                                                            ( function generateHTML () {
                                                                const body = document.body || document.getElementsByTagName ('body') [0];
                                                                if (body || typeof body == "object") {
                                                                    body.innerHTML = data;
                                                                }
                                                            }) ();
                                                        }
                                                        if (lowerType == "javascript" || lowerType == "js") {
                                                            ( function generateScript () {
                                                                const body = document.body || document.getElementsByTagName('body') [0];
                                                                const script = document.createElement ('script');
                                                                body.appendChild (script);
                                                                script.appendChild ( document.createTextNode (data) );
                                                            }) ();
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            console.error ("reference data error");
                                        }
                                    }) ();
                                });
                            `;
                            console.log (initJSdocs?.trim ());
                        }
                    }, 10);
                    } catch (intervalError) { console.error (intervalError);
                        initController ();
                    };
                }; 
                initController ();
            } catch (controlerFunctionalOrCallerError) {
                console.error (controlerFunctionalOrCallerError);
            };
        } else {
            console.warn (`wrapper not available, for better experience use wrapper tags.`);
            console.warn (`example <wrapper type="html or css or javascript"> your code data </wrapper>`);

            const externalStyleSheets = document.querySelectorAll ("link");
            const internalStyleSheets = document.querySelectorAll ("style");
            const scripts = document.querySelectorAll ("script");
            let indexCount = 0; const AllWrapperElements = [];
            if (externalStyleSheets || typeof externalStyleSheets == "object") {
                externalStyleSheets.forEach (async function (element, index, array) {
                    const getHref = element.getAttribute ("href")?.trim ();
                    if (getHref && typeof getHref == "string") {
                        element.setAttribute ("index", indexCount);
                        AllWrapperElements.push ({
                            type: "style",
                            element: element
                        });
                        indexCount++;
                    }
                });
            }
            if (internalStyleSheets || typeof internalStyleSheets == "object") {
                internalStyleSheets.forEach (async function (element, index, array) {
                    const getInnerStyle = element.innerText?.trim ();
                    if (getInnerStyle && typeof getInnerStyle == "string") {
                        element.setAttribute ("index", indexCount);
                        AllWrapperElements.push ({
                            type: "style",
                            element: element
                        });
                        indexCount++;
                    }
                });
            }
            if (scripts || typeof scripts == "object") { 
                scripts.forEach (async function (element, index, array) { 
                    const getSrc = element.getAttribute ("src")?.trim (); 
                    const innerScript = element.innerText?.trim (); 
                    if (getSrc && typeof getSrc == "string") { 
                        if (element.getAttribute ("id") != "wrapper-cdn") { 
                            element.setAttribute ("index", indexCount);
                            AllWrapperElements.push ({
                                type: "script",
                                element: element
                            }); 
                            indexCount++; 
                        } 
                    } 
                    if (innerScript && typeof innerScript == "string") { 
                        if (element.getAttribute ("id") != "wrapper-cdn") { 
                            element.setAttribute ("index", indexCount);
                            AllWrapperElements.push ({
                                type: "script",
                                element: element
                            }); 
                            indexCount++; 
                        } 
                    } 
                });
            }
            const initData = []; 
            AllWrapperElements.forEach (async function (element, index, array) {
                const attrIndex = parseInt (element.element.getAttribute ("index"));
                const type = element.type?.trim ();
                if (type && typeof type == "string") {
                    if (type == "style") {
                        const isHref = element.element.getAttribute ("href");
                        if (isHref && typeof isHref == "string") {
                            const xhr = new XMLHttpRequest ();
                            xhr.onreadystatechange = async function() {
                                if (xhr.readyState == XMLHttpRequest.DONE) {
                                    const dataObject = { index: attrIndex, data: xhr.responseText, type: type };
                                    initData.push (dataObject);
                                }
                            }
                            xhr.open ('GET', isHref, true);
                            xhr.send (null);
                        } else {
                            const dataObject = { index: attrIndex, data: element.element.innerText, type: type };
                            initData.push (dataObject);
                        }
                    }
                    if (type == "script") {
                        const isSrc = element.element.getAttribute ("src");
                        if (isSrc && typeof isSrc == "string") {
                            const xhr = new XMLHttpRequest ();
                            xhr.onreadystatechange = async function() {
                                if (xhr.readyState == XMLHttpRequest.DONE) {
                                    const dataObject = { index: attrIndex, data: xhr.responseText, type: type };
                                    initData.push (dataObject);
                                }
                            }
                            xhr.open ('GET', isSrc, true);
                            xhr.send (null);
                        } else {
                            const dataObject = { index: attrIndex, data: element.element.innerText, type: type };
                            initData.push (dataObject);
                        }
                    }
                }
            });
            try {
                const initController = function  () {
                    try {
                    const isInterval = setInterval ( function () {
                        if (initData.length == indexCount) {
                            ( function initClearInterval (clr) {
                                clearInterval (clr);
                            }) (isInterval);
                            const assembleData = [];
                            for ( const indexKey in initData ) {
                                const dataObject = initData [indexKey];
                                assembleData [dataObject.index] = { 
                                    data: dataObject.data,
                                    type: dataObject.type
                                };
                            }
                            const refererJSON = JSON.stringify (assembleData);
                            const scriptElement = document.querySelectorAll ("script");
                            for (const script of scriptElement) {
                                script.remove ();
                            }
                            const refererHTML = JSON.stringify ([document.body.innerHTML?.trim ()]);
                            const initJSdocs = `
                                !function ( window, document, caller ) {
                                    const condWindow = window && 
                                        typeof window === "object" &&  window instanceof Object === true
                                    if (condWindow) {
                                        const condDocument = document && 
                                            typeof document === "object" &&  document instanceof Object === true
                                        if (condDocument) {
                                            if ( caller && typeof caller === "function" ) {
                                                caller ();
                                            }
                                        } else { 
                                            console.warn ("document Object Not Found"); 
                                        }
                                    } else {
                                        console.warn ("window Object Not Found");
                                    }
                                } (window, window.document, function () {
                                    if (!window && !window.document && !document) { return undefined; }
                                    ( function () {
                                        const refererJSON = ${refererJSON};
                                        if (refererJSON && typeof refererJSON == "object") {
                                            ( function generateStyle () {
                                                const head = document.head || document.getElementsByTagName('head') [0];
                                                const style = document.createElement ('style');
                                                style.setAttribute ("type", 'text/css');
                                                style.setAttribute ("id", 'html-css-wrapper-style');
                                                head.appendChild (style);
                                            }) ();
                                            function insertCSS (Element, CSS) {
                                                if (Element.styleSheet) {
                                                    Element.styleSheet.cssText = CSS;
                                                } else {
                                                    Element.appendChild(document.createTextNode(CSS));
                                                }
                                            };
                                            for (const obj of refererJSON) {
                                                if (obj && typeof obj == "object") {
                                                    const data = obj.data?.trim ();
                                                    const type = obj.type?.trim ();
                                                    if (data && typeof data == "string" && type && typeof type == "string") {
                                                        const lowerType = type.toLocaleLowerCase ();
                                                        if (lowerType == "style") {
                                                            const getSTYLE = document.getElementById ("html-css-wrapper-style");
                                                            if (getSTYLE || typeof getSTYLE == "object") {
                                                                insertCSS (getSTYLE, data);
                                                            }
                                                        }
                                                        if (lowerType == "script") {
                                                            ( function generateScript () {
                                                                const body = document.body || document.getElementsByTagName('body') [0];
                                                                const script = document.createElement ('script');
                                                                body.appendChild (script);
                                                                script.appendChild ( document.createTextNode (data) );
                                                            }) ();
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }) ();
                                    ( function () {
                                        const refererHTML = ${refererHTML};
                                        if (refererHTML && typeof refererHTML == "object") {
                                            if (document.body && typeof document.body == "object") {
                                                document.body.innerHTML = refererHTML [0];
                                            } else {
                                                console.warn ("your Page Has Not Body Tag");
                                            }
                                        }
                                    }) ();
                                });
                            `;
                            console.log (initJSdocs?.trim ());
                        }
                    }, 10);
                    } catch (intervalError) { console.error (intervalError);
                        initController ();
                    };
                }; 
                initController ();
            } catch (setIntervalError) {
                console.log (setIntervalError);
            }
        } 
    }) ();
});