(function (a) {
    if (a && typeof a['cb-uiiFormFilters'] !== 'undefined') {
        var obj = {};
        obj.uiiFormFilters = [
            {
                type: 'workdayApplicationFrame',
                version: '0.3',
                formFilter: function (context) {
                    return wmjQuery(
                        "[data-automation-id^='wd-ActiveListRowEditor'],[id^='wd-EditPage']",
                    ).parents('#workdayApplicationFrame');
                },
                errorFilter: function (context) {
                    return wmjQuery(
                        "[data-automation-id='errorWidgetInlineMessageContainerCanvas']",
                    );
                },
                blockerFilter: function (context) {
                    if (
                        wmjQuery(context).find(
                            '[data-automation-id=calendarNavigationOverlay]',
                        ).length > 0
                    )
                        return true;
                    return false;
                },
                formParentFilter: function (context) {
                    return wmjQuery('body');
                },
                activeFilter: function (context) {
                    context = wmjQuery(context);
                    return context.filter(':deepui_visible').length !== 0;
                },
                indicatorFilter: function (context) {
                    return wmjQuery("[data-automation-id='pageHeaderTitleText'");
                },

            },
            {
                type: 'workdayModal',
                version: '0.3',
                formFilter: function (context) {
                    return wmjQuery(
                        "#workdayApplicationFrame[role='dialog'][aria-modal='true']",
                    );
                },
                errorFilter: function (context) {
                    return wmjQuery(
                        "[data-automation-id='errorWidgetInlineMessageContainerCanvas']",
                    );
                },
                formErrorFilter: function (context) {
                    return wmjQuery("[data-automation-id='errorWidgetBarCanvas']");
                },
                formParentFilter: function (context) {
                    return wmjQuery('body');
                },
                blockerFilter: function (context) {
                    if (
                        wmjQuery(context).find(
                            '[data-automation-id=calendarNavigationOverlay]',
                        ).length > 0
                    )
                        return true;
                    return false;
                },
                indicatorFilter: function (context) {
                    return wmjQuery("[data-automation-id='pageHeaderTitleText'");
                },
                activeFilter: function (context) {
                    context = wmjQuery(context);
                    return context.filter(':deepui_visible').length !== 0;
                },

            },
            {
                type: 'workdayPopup',
                version: '0.3',
                formFilter: function (context) {
                    return wmjQuery(
                        "[data-automation-id='editPopup'][role='dialog'][aria-modal='true']",
                    );
                },
                errorFilter: function (context) {
                    return wmjQuery(
                        "[data-automation-id='errorWidgetInlineMessageContainerCanvas']",
                    );
                },
                formErrorFilter: function (context) {
                    return wmjQuery("[data-automation-id='errorWidgetBarCanvas']");
                },
                formParentFilter: function (context) {
                    return wmjQuery('body');
                },
                blockerFilter: function (context) {
                    if (
                        wmjQuery(context).find(
                            '[data-automation-id=calendarNavigationOverlay]',
                        ).length > 0
                    )
                        return true;
                    return false;
                },
                indicatorFilter: function (context) {
                    return wmjQuery("[data-automation-id='pageHeaderTitleText'");
                },
                activeFilter: function (context) {
                    context = wmjQuery(context);
                    return context.filter(':deepui_visible').length !== 0;
                },

            },

        ];
        a['cb-uiiFormFilters'](obj);
    }
})(window && window._walkmeInternals);
