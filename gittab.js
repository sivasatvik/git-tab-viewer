(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    /* Insert the "value" number of spaces in place of a tab.
     * Called when a new value is selected.
     * Possible values: 2, 4, 8
     */
    function insertTabs(value){
        const selectElements = document.querySelectorAll(".tab-size[data-tab-size='2'], .tab-size[data-tab-size='4'], \
                                                      .tab-size[data-tab-size='8'], .inline-review-comment, \
                                                      .gist table.lines, table.diff-table, \
                                                      .markdown-body pre, body > pre");
        // console.log("selectElements length: " + selectElements.length);
        var j;
        for (j = 0; j < selectElements.length; j++){
            // console.log("inside elements, tab size: " + value);
            selectElements[j].style.MozTabSize = value;
        }
    }

    /**
     * Listener for the message from popup window of the add on
     */
    browser.runtime.onMessage.addListener((message) => {
        if(message.command == "tabify"){
            insertTabs(message.value);
        }
    });

    /**
     * Set the default number of spaces for a tab to be 4
     */
    const selectElements = document.querySelectorAll(".tab-size[data-tab-size='2'], .tab-size[data-tab-size='4'], \
                                                        .tab-size[data-tab-size='8'], .inline-review-comment, \
                                                        .gist table.lines, table.diff-table, \
                                                        .markdown-body pre, body > pre");
    // console.log("selectElements length: " + selectElements.length);
    var j;
    for (j = 0; j < selectElements.length; j++){
        // console.log("inside elements, tab size: 4");
        selectElements[j].style.MozTabSize = '4';
    }

})();
