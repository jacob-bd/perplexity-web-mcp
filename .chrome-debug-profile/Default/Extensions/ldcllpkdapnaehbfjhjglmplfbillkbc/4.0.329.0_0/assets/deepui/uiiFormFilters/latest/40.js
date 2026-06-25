(function (a) {
    if (a && typeof a['cb-uiiFormFilters'] !== 'undefined') {
        var obj = {};
        obj.uiiFormFilters = [
            {
                type: 'SNiframe',
                version: '2.0',
                formParentFilter: function (context) {
                    return wmjQuery('body');
                },
                formFilter: function (context) {
                    const iframe = wmjQuery('#gsft_main')[0];
                    const body =
                        iframe && iframe.contentDocument && iframe.contentDocument.body;
                    if (body) {
                        const formCandidates = wmjQuery(body)
                            .find('form[method=POST]')
                            .filter(':mt_visible');
                        if (formCandidates.length > 0) {
                            if (
                                wmjQuery(body)
                                    .find('input,selector')
                                    .filter(':deepui_visible').length > 3
                            ) {
                                return wmjQuery(body);
                            }
                        }
                    }
                    return wmjQuery();
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
                        .find('.fieldmsg.notification-error')
                        .filter(':deepui_visible');
                },
                formErrorFilter: function (context) {
                    return wmjQuery(context)
                        .find('.outputmsg_error.notification-error')
                        .filter(':deepui_visible');
                },
                blockerFilter: function (context) {
                    const errors = wmjQuery(context)
                        .find('.outputmsg_error')
                        .filter(':deepui_visible');
                    if (errors.length >= 1) {
                        return true;
                    }
                    return false;
                },
                formIframeFilter: function (context) {
                    return wmjQuery('#gsft_main')[0].contentDocument;
                },

            },
            {
                type: 'serviceNowServicePortal',
                version: '2.0',
                formParentFilter: function (context) {
                    return wmjQuery('.sp-page-root');
                },
                formFilter: function (context) {
                    let form = wmjQuery("[form-model*='data.sc_cat_item']").closest(
                        '.sp-row-content',
                    );
                    if (form.length > 0) {
                        return form;
                    }
                    form = wmjQuery("[aria-label='form']").closest('.sp-row-content');
                    if (form.length > 0) {
                        return form;
                    }
                    return wmjQuery();
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
                        .find('.notification-error')
                        .filter(':deepui_visible');
                },
                formErrorFilter: function (context) {
                    return wmjQuery('.alert-danger').filter(':deepui_visible');
                },
                blockerFilter: function (context) {
                    const errors = wmjQuery(context)
                        .find('.outputmsg_error')
                        .filter(':deepui_visible');
                    if (errors.length >= 1) {
                        return true;
                    }
                    return false;
                },

            },
            {
                type: 'serviceNowITSMShadow',
                version: '2.0',
                formParentFilter: function (context) {
                    const shadowHost = document.querySelector('[global-navigation-config]');
                    if (shadowHost && shadowHost.shadowRoot)
                        return wmjQuery(
                            shadowHost.shadowRoot.querySelector('sn-polaris-layout'),
                        );
                    return wmjQuery();
                },
                formFilter: function (context) {
                    const iframe = wmjQuery('#gsft_main', context)[0];
                    const body =
                        iframe && iframe.contentDocument && iframe.contentDocument.body;
                    if (body) {
                        const formCandidates = wmjQuery(body, context)
                            .find('form[method=POST]')
                            .filter(':mt_visible');
                        if (formCandidates.length > 0) {
                            if (
                                wmjQuery(body, context)
                                    .find('input,selector')
                                    .filter(':deepui_visible').length > 3
                            ) {
                                return wmjQuery(body, context);
                            }
                        }
                    }
                    return wmjQuery();
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
                        .find('.fieldmsg.notification-error')
                        .filter(':deepui_visible');
                },
                formErrorFilter: function (context) {
                    return wmjQuery(context)
                        .find('.outputmsg_error.notification-error')
                        .filter(':deepui_visible');
                },
                blockerFilter: function (context) {
                    const errors = wmjQuery(context)
                        .find('.outputmsg_error')
                        .filter(':deepui_visible');
                    if (errors.length >= 1) {
                        return true;
                    }
                    return false;
                },
                formIframeFilter: function (context) {
                    return wmjQuery('#gsft_main', context)[0].contentDocument;
                },

            },

        ];
        a['cb-uiiFormFilters'](obj);
    }
})(window && window._walkmeInternals);
