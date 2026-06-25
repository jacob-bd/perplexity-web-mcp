(function (a) {
    if (a && typeof a['cb-uiiFormFilters'] !== 'undefined') {
        var obj = {};
        obj.uiiFormFilters = [
            {
                type: 's4hModal',
                version: '1.0',
                formParentFilter: function (context) {
                    return wmjQuery('#sap-ui-static').parent();
                },
                formFilter: function (context) {
                    return wmjQuery(context)
                        .find("[role='dialog'].sapMDialog")
                        .not('.sapMBusyDialog-Light');
                },
                indicatorFilter: function (context) {
                    return true;
                },
                activeFilter: function (context) {
                    return wmjQuery(context).filter(':deepui_visible').length === 1;
                },
                errorFilter: function (context) {
                    return wmjQuery('input[aria-errormessage]').parents(
                        'div.sapMInputBase',
                    );
                },
                formErrorFilter: function (context) {
                    return wmjQuery(
                        "div.sapMMessageBoxError[role='alertdialog'],div.sapMMsgStripError",
                    );
                },
                blockerFilter: function (context) {
                    context = wmjQuery(context);
                    const inputs = wmjQuery(context)
                        .find('input')
                        .filter(':deepui_visible');

                    if (inputs.length <= 2) {
                        return true;
                    }

                    const bdiTexts = ['Sales Order Type'];
                    for (const bdiText of bdiTexts) {
                        const bdiExists =
                            wmjQuery(`bdi:contains('${bdiText}')`)
                                .filter(':first')
                                .text() === bdiText;
                        if (bdiExists) {
                            return true;
                        }
                    }

                    return false;
                },
                'metaDataFilters': [
                    {
                        name: 'originalTitle',
                        dataFilter: function (context) {
                            context = wmjQuery(context);
                            let data = context
                                .find('header')
                                .find('h2.sapMTitle')
                                .filter(':first');
                            if (data.length === 0) {
                                data = context
                                    .find('header')
                                    .find('h1.sapMTitle')
                                    .filter(':first');
                            }
                            if (data.length === 0) {
                                data = context
                                    .find('header')
                                    .find('div.sapMTitle')
                                    .filter(':first');
                            }
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
                                } else {
                                    if (data.toLowerCase().indexOf('enroll') === 0) {
                                        data = 'Enroll';
                                    } else {
                                        const delimiters = [' for ', ' - ', ' : ', ': '];
                                        for (const delimiter of delimiters) {
                                            const idx = data
                                                .toLowerCase()
                                                .indexOf(delimiter);
                                            if (idx > 0) {
                                                data = data.slice(0, idx);
                                                break;
                                            }
                                        }
                                    }
                                    return data;
                                }
                            }
                        },

                    },

                ],
            },
            {
                type: 's4hContent',
                version: '1.0',
                formParentFilter: function (context) {
                    return wmjQuery('#sap-ui-static').parent();
                },
                formFilter: function (context) {
                    let form = wmjQuery(context).find('.sapMPageWithHeader').not('.sapMPageBusyCoversAll').filter(':deepui_visible');
                    if (form.length === 0) {
                        form = wmjQuery(context).find('.sapUxAPObjectPageLayout').filter(':deepui_visible');
                    }
                    return form;
                },
                indicatorFilter: function (context) {
                    return true;
                },
                activeFilter: function (context) {
                    return wmjQuery(context).filter(':deepui_visible').length === 1
                },
                errorFilter: function (context) {
                    let errorCandidates = wmjQuery('input[aria-errormessage], textarea[aria-errormessage]').parents(
                        'div.sapMInputBase',
                    );
                    let tableParents = wmjQuery()
                    tableParents = tableParents.add(errorCandidates.parents('table.sapUiTableCtrl'))
                    tableParents = tableParents.add(errorCandidates.parents('table.sapMListTbl'))
                    return errorCandidates.not(tableParents.find(errorCandidates));
                },
                formErrorFilter: function (context) {
                    let errors = wmjQuery(
                        "div.sapMMessageBoxError[role='alertdialog'],div.sapMMsgStripError",
                    ).find('.sapMText').filter(':deepui_visible');
                    return errors;
                },
                blockerFilter: function (context) {
                    context = wmjQuery(context);
                    const inputs = wmjQuery(context)
                        .find('input')
                        .filter(':deepui_visible');

                    if (inputs.length <= 2) {
                        return true;
                    }

                    const buttonsText = [
                        'Adapt Filters',
                        'Hide Filter Bar',
                        'Edit',
                        'Saved Version',
                        'Return to Draft',
                    ];
                    for (const buttonText of buttonsText) {
                        const buttonExists =
                            wmjQuery(context)
                                .find('button .sapMBtnInner')
                                .find(`:contains('${buttonText}')`)
                                .filter(':first')
                                .text() === buttonText;
                        if (buttonExists) {
                            return true;
                        }
                    }
                    return false;
                },
                lazyLoadingFilter: function (context) {
                    return wmjQuery('div.sapUxAPObjectPageSubSection');
                },
                'metaDataFilters': [
                    {
                        name: 'originalTitle',
                        dataFilter: function (context) {
                            let data = wmjQuery('.sapUshellAppTitleText');
                            if (data.length === 0) {
                                data = wmjQuery('h1#shellAppTitle');
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
