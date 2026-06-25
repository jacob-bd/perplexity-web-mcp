(function (a) {
    if (a && typeof a['cb-uiiFormFilters'] !== 'undefined') {
        var obj = {};
        obj.uiiFormFilters = [
            {
                type: 'aribaContent',
                version: '1.0',
                formParentFilter: function (context) {
                    let formParent = wmjQuery("td[aria-label='Page Content']");
                    if (formParent.length === 0) {
                        formParent = wmjQuery('form');
                    }
                    return formParent;
                },
                formFilter: function (context) {
                    return wmjQuery(context).find('div.flexContainer').filter(':first');
                },
                indicatorFilter: function (context) {
                    return true;
                },
                activeFilter: function (context) {
                    return wmjQuery(context).filter(':deepui_visible').length === 1;
                },
                errorFilter: function (context) {
                    errorDivIdsJquery = wmjQuery('div[_errorcontentdivid]');
                    errorDivIds = [];
                    for (let i = 0; i < errorDivIdsJquery.length; i++) {
                        errorDivIds[i] = errorDivIdsJquery[i].attributes.getNamedItem('_errorcontentdivid').nodeValue;
                    }

                    errors = wmjQuery();
                    for (let i = 0; i < errorDivIds.length; i++) {
                        errors = errors.add(wmjQuery(`div[id='${errorDivIds[i]}'`));
                    }
                    return errors;
                },
                formErrorFilter: function (context) {
                    return wmjQuery("div.pageErrorPanel").find('.msgText').not('.hintText');
                },
                blockerFilter: function (context) {
                    const inputs = wmjQuery(context)
                        .find('input')
                        .filter(':deepui_visible');
                    return inputs.length <= 2;
                },
                'metaDataFilters': [
                    {
                        name: 'originalTitle',
                        dataFilter: function (context) {
                            let data = wmjQuery('span.pageHead').filter(':first');
                            if (!data.length) {
                                data = wmjQuery('span.pageSubHead').filter(':first');
                            }
                            if (!data.length) {
                                data = wmjQuery('div.header-content').filter(':first');
                            }
                            if (!data.length) {
                                data = wmjQuery('div.pageHead').filter(':first');
                            }
                            if (!data.length) {
                                data = wmjQuery('td.w-wizard-layout-top-right').filter(':first');
                            }
                            data = data?.text?.();
                            return data;
                        },

                    },

                ],
            },
            {
                type: 'aribaIframe',
                version: '1.0',
                formParentFilter: function (context) {
                    const iframe = wmjQuery('iframe#SMFrame')[0];
                    if (iframe && iframe.contentDocument) {
                        return wmjQuery(iframe.contentDocument).find('body');
                    }
                    return wmjQuery();
                },
                formFilter: function (context) {
                    return wmjQuery(context).find('sm-app');
                },
                indicatorFilter: function (context) {
                    return true;
                },
                activeFilter: function (context) {
                    return wmjQuery(context).filter(':deepui_visible').length === 1;
                },
                errorFilter: function (context) {
                    return wmjQuery('error-message', context);
                },
                formErrorFilter: function (context) {
                    return wmjQuery();
                },
                blockerFilter: function (context) {
                    const inputs = wmjQuery(context)
                        .find('input')
                        .filter(':deepui_visible');
                    return inputs.length <= 2;
                },
                formIframeFilter: function (context) {
                    return wmjQuery('iframe#SMFrame')[0]?.contentDocument;
                },
                'metaDataFilters': [
                    {
                        name: 'originalTitle',
                        dataFilter: function (context) {
                            let data = context.find("div[class$='-title'").filter(':first');
                            if (!data.length) {
                                data = context.find('div.header-content').filter(':first');
                            }
                            if (!data.length) {
                                data = context.find('div.pageHead').filter(':first');
                            }
                            if (!data.length) {
                                data = context.find('td.w-wizard-layout-top-right').filter(':first');
                            }
                            data = data?.text?.();
                            return data;
                        },

                    },

                ],
            },

        ];
        a['cb-uiiFormFilters'](obj);
    }
})(window && window._walkmeInternals);
