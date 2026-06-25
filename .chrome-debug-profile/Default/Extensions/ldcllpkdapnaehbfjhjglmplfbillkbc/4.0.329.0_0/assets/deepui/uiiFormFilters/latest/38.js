(function (a) {
    if (a && typeof a['cb-uiiFormFilters'] !== 'undefined') {
        var obj = {};
        obj.uiiFormFilters = [
            {
                type: 'sapConcurModal',
                version: '1.6',
                formParentFilter: function (context) {
                    return wmjQuery('body');
                },
                formFilter: function (context) {
                    context = wmjQuery(context);
                    let formCandidates = context.find(
                        "div.sapcnqr-modal__content[role='document']",
                    );

                    if (formCandidates.length === 0) {
                        formCandidates = context.find(
                            "div[role='dialog'][data-nuiexp='report-header-dialog'].sapcnqr-dialog"
                        );
                    }

                    let forms = wmjQuery();
                    for (const candidate of formCandidates) {
                        const iframe = wmjQuery(candidate).find('iframe');
                        if (iframe.length === 1) {
                            forms = forms.add(iframe.first().contentDocument);
                        } else {
                            forms = forms.add(candidate);
                        }
                    }
                    return forms;
                },
                indicatorFilter: function (context) {
                    context = wmjQuery(context);
                    return context.find('label.sapcnqr-form-field__label')[0];
                },
                activeFilter: function (context) {
                    return wmjQuery(context).filter(':deepui_visible').length !== 0;
                },
                errorFilter: function (context) {
                    return wmjQuery('.sapcnqr-validation-message--error');
                },
                formErrorFilter: function (context) {
                    let errors = wmjQuery("div[role='alertdialog']");
                    errors = errors.not(errors.has('.sapcnqr-messagebox__header--confirm'))
                    let errorMessage = errors.find("div[class*='alert__content']");
                    if (errorMessage.length === 0) {
                        errorMessage = errors.find("div.sapcnqr-messagebox__header--error");
                    }
                    return errorMessage;
                },
                blockerFilter: function (context) {
                    context = wmjQuery(context);
                    const inputs = context
                        .find("input[type='text'],textarea,div[role='combobox']")
                        .filter(':deepui_visible');
                    const tables = context.find('table');
                    return inputs.not(tables.find(inputs)).length < 2;
                },
                lazyLoadingFilter: function (context) {
                    return wmjQuery('div.sapcnqr-modal__footer')
                },

            },
            {
                type: 'sapConcurContent',
                version: '1.6',
                formParentFilter: function (context) {
                    return wmjQuery('body');
                },
                formFilter: function (context) {
                    context = wmjQuery(context);
                    return context.find('#cnqr-app-content').not('.container');
                },
                indicatorFilter: function (context) {
                    let indicator = wmjQuery('button').find('.show-receipt-toggle');
                    if (indicator.length === 0) {
                        context = wmjQuery(context);
                        indicator = context.find('h1');
                    }
                    return indicator[0];
                },
                activeFilter: function (context) {
                    return wmjQuery(context).filter(':deepui_visible').length !== 0;
                },
                errorFilter: function (context) {
                    return wmjQuery('.sapcnqr-validation-message--error');
                },
                formErrorFilter: function (context) {
                    return wmjQuery("div[role='alertdialog'] div[class*='alert__content']");
                },
                blockerFilter: function (context) {
                    context = wmjQuery(context);
                    const inputs = context
                        .find("input[type='text'],textarea,div[role='combobox']")
                        .filter(':deepui_visible');
                    const tables = context.find('table');
                    if (inputs.not(tables.find(inputs)).length < 2) {
                        return true;
                    }

                    const tabDivs = wmjQuery(context).find('#flightTabDiv, #carTabDiv, #hotelTabDiv');

                    if (tabDivs.filter('[aria-hidden="false"]').length > 0 &&
                        tabDivs.find(inputs).length > 2) {
                        return true;
                    }

                    if (document.URL.includes('nui/travelrequest')) {
                        return true;
                    }

                    return false;
                },
                'metaDataFilters': [
                    {
                        name: 'originalTitle',
                        dataFilter: function (context) {
                            context = wmjQuery(context);
                            let data = context.find("h1[data-nuiexp='exp-expense-name']").text();

                            if (typeof data === 'string') {
                                return data;
                            } else {
                                data = data?.text?.();
                                if (!data) return '';
                                else if (
                                    data.toLowerCase().indexOf('new') === 0 ||
                                    data.toLowerCase().indexOf('create') === 0
                                ) {
                                    return data;
                                }
                            }
                        },

                    },

                ],
            },

        ];
        a['cb-uiiFormFilters'](obj);
    }
})(window && window._walkmeInternals);
