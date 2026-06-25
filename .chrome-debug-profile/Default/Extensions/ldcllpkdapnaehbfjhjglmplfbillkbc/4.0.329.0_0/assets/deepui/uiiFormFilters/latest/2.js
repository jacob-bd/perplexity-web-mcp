(function (a) {
    if (a && typeof a['cb-uiiFormFilters'] !== 'undefined') {
        var obj = {};
        obj.uiiFormFilters = [
            {
                type: 'dynamicsMain',
                version: '2.0',
                formParentFilter: function (context) {
                    return wmjQuery('#mainContent');
                },
                formFilter: function (context) {
                    return wmjQuery('[role=form]', context).filter(':deepui_visible');
                },
                formTabsFilter: function (context) {
                    return wmjQuery('[role=tabpanel]', context).filter(':deepui_visible');
                },
                formContextFilter: function (context) {
                    return wmjQuery('#mainContent')[0];
                },
                indicatorFilter: function (context) {
                    const indicator = wmjQuery(context);
                    if (indicator.length === 1) {
                        return indicator[0];
                    }
                    return null;
                },
                activeFilter: function (context) {
                    return wmjQuery(context).filter(':deepui_visible').length === 1;
                },
                errorFilter: function (context) {
                    return wmjQuery(context)
                        .find("[data-id*='error-message']")
                        .filter(':deepui_visible');
                },
                formErrorFilter: function (context) {
                    return wmjQuery(context).find(
                        '[data-id=warningNotification],[role=alert]>[data-id=notificationWrapper],[role=alert]+[data-id=notificationWrapper]',
                    );
                },
                blockerFilter: function (context) {
                    const inputs = wmjQuery(context)
                        .find('input,textarea,[data-id$=SelectedRecordList]')
                        .filter(':deepui_visible');
                    if (inputs.length < 3) {
                        return true;
                    }
                    const stageContainer = wmjQuery(
                        "[data-id='MscrmControls.Containers.ProcessStageControl-processHeaderStageFlyoutInnerContainer']",
                    );
                    if (stageContainer.filter(':deepui_visible').length > 0) {
                        return true;
                    }
                    return false;
                },
                lazyLoadingFilter: function (context) {
                    return wmjQuery(
                        'section[aria-label][data-id]>div[role=presentation]>div[role=presentation]',
                    );
                },

            },

        ];
        a['cb-uiiFormFilters'](obj);
    }
})(window && window._walkmeInternals);
