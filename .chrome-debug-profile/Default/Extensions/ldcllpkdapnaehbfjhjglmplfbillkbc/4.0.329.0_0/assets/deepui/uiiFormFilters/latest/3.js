(function (a) {
    if (a && typeof a['cb-uiiFormFilters'] !== 'undefined') {
        var obj = {};
        obj.uiiFormFilters = [
            {
                type: 'sufaModal',
                version: '2.4',
                formParentFilter: function (context) {
                    let parent = wmjQuery('#sap-ui-static').parent();
                    if (parent.length === 0) {
                        parent = wmjQuery('#appCanvas').parent();
                    }
                    if (parent.length === 0) {
                        parent = wmjQuery('#sfOverlayMgr');
                    }
                    return parent;
                },
                formFilter: function (context) {
                    const parent = wmjQuery(context);
                    let form = parent
                        .find("[role='dialog'].sapMDialog")
                        .not('.sapMBusyDialog-Light');
                    if (form.length == 0) {
                        form = parent
                            .find('ui5-dialog')
                            .filter(
                                "[data-testid='app-dialog'], [data-testid='request-feedback-dialog']",
                            );
                    }
                    if (form.length == 0) {
                        form = parent.find('.ectFormContainer');
                    }
                    return form;
                },
                indicatorFilter: function (context) {
                    return true;
                },
                activeFilter: function (context) {
                    return wmjQuery(context).filter(':deepui_visible').length === 1;
                },
                errorFilter: function (context) {
                    if (wmjQuery('div.sapMValueStateMessageError').length > 0)
                        return wmjQuery(
                            "div.sapUiPseudoInvisibleText[aria-atomic='true']",
                        ).parent();
                    let errors = wmjQuery('input[aria-errormessage]').parents(
                        'div.sapMInputBase',
                    );
                    if (errors.length === 0) {
                        errors = wmjQuery('div.ectErrorPopup')
                    }
                    return errors;
                },
                formErrorFilter: function (context) {
                    let errors = wmjQuery(
                        "div.sapMMessageBoxError[role='alertdialog'],div.sapMMsgStripError",
                    );
                    if (errors.length === 0) {
                        errors = wmjQuery('.sysMsgErrorList').find('li')
                    }
                    return errors
                },
                blockerFilter: function (context) {
                    context = wmjQuery(context);
                    const inputs = wmjQuery(context)
                        .find('input,ui5-label')
                        .filter(':deepui_visible');
                    return inputs.length <= 2;
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
                                data = context.find("div[slot='header']").filter(':first');
                            }
                            if (data.length === 0) {
                                data = context
                                    .find('header.sapMPageHeader')
                                    .find("span[id$='title-inner']")
                                    .filter(':first');
                            } if (data.length === 0) {
                                data = context.find('.pwhHeaderTitle')
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
                type: 'sufaContent',
                version: '2.4',
                formParentFilter: function (context) {
                    return wmjQuery("body[data-sap-ui-area='content']");
                },
                formFilter: function (context) {
                    context = wmjQuery(context);
                    return context
                        .find("[id^='com.nn.'][id$='-content']")
                        .find('.sapMShellCentralBox');
                },
                indicatorFilter: function (context) {
                    context = wmjQuery(context);
                    return context
                        .find('h3.sapMTitle,h3.sapMWizardStepTitle')
                        .filter(':deepui_visible')[0];
                },
                activeFilter: function (context) {
                    return wmjQuery(context).filter(':deepui_visible').length !== 0;
                },
                errorFilter: function (context) {
                    const errors = wmjQuery('div.sapMMsgStripError .sapMMsgStripMessage', context);
                    return errors;
                },
                formErrorFilter: function (context) {
                    return false;
                },
                blockerFilter: function (context) {
                    context = wmjQuery(context);
                    const inputs = wmjQuery(context)
                        .find('input')
                        .filter(':deepui_visible');
                    return inputs.length <= 2;
                },
                formIframeFilter: function (context) {
                    const iframe = wmjQuery('iframe#application-MssForms-display')[0]
                    if (iframe) {
                        return iframe.contentDocument;
                    }
                },
                recaptureElementsFilter: function (context) {
                    const elements = wmjQuery(context)
                        .find('button[id*="next"]')
                        .filter(':deepui_visible');
                    return elements;
                },

            },
            {
                type: 'sufaGlobalLighting',
                version: '2.4',
                formParentFilter: function (context) {
                    return wmjQuery('body').children("[class*='globalLighting']");
                },
                formFilter: function (context) {
                    context = wmjQuery(context);
                    let forms = context.find('#container').find('#content');
                    if (forms.length > 0) return forms;
                    forms = context
                        .find('form#acmeform')
                        .find('table#contentBodyTable:not(.pm2contenttable)');
                    if (forms.length > 0) return forms;
                    forms = context.find('#page_content');
                    return forms;
                },
                indicatorFilter: function (context) {
                    return true;
                },
                activeFilter: function (context) {
                    return wmjQuery(context).filter(':deepui_visible').length !== 0;
                },
                errorFilter: function (context) {
                    let errors = wmjQuery(context).find(
                        "[value-state='Error'],td.redRow,input.redRow",
                    );
                    if (!errors.length) {
                        errors = wmjQuery(context).find(
                            'div.fd-message-strip--error',
                        ).filter(':deepui_visible');
                    }
                    return errors;
                },
                formErrorFilter: function (context) {
                    const dialog = wmjQuery("div[role='dialog']");
                    const header = dialog.find(
                        "header.sapMDialogTitle div[role='heading']",
                    );
                    if (
                        header.length === 1 &&
                        header.text().toLowerCase().indexOf('validation') > -1
                    ) {
                        return dialog;
                    }

                    let errors = wmjQuery('div.error').not('.fd-message-strip--error').filter(':deepui_visible');
                    if (errors.length) {
                        return errors;
                    }

                    return false;
                },
                blockerFilter: function (context) {
                    const inputs = wmjQuery(context)
                        .find('input,textarea')
                        .filter(':deepui_visible');
                    if (inputs.length <= 2) {
                        return true;
                    }
                    if (wmjQuery('#orgchart').length > 0) return true;
                    if (parseInt(wmjQuery('.sfCurrentStep').text()) > 3) return true;
                    const buttonsText = ['Close Job Requisition', 'Close From Consideration'];
                    for (const buttonText of buttonsText) {
                        const buttonExists =
                            (wmjQuery(context)
                                .find(`.globalPrimaryButton[value='${buttonText}']`).length) ||
                            (wmjQuery(context)
                                .find(`button:contains('${buttonText}')`).length);
                        if (buttonExists) {
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
                            let data = wmjQuery('xweb-shellbar').contents()
                                .find('ui5-tabcontainer-sf-header').contents()
                                .find('div.ui5-tab-strip-item--selected');
                            if (data.length === 0) {
                                data = context
                                    .find('h2#mtrFormHeader-title')
                                    .filter(':first');
                            }
                            if (data.length === 0) {
                                data = context
                                    .find('#formHeader')
                                    .find('h1.formHeadTitle')
                                    .filter(':first');
                            }
                            if (data.length === 0) {
                                data = context
                                    .find('#applicationBodyHeader')
                                    .find('h1.paneBodyTitle')
                                    .filter(':first');
                            }
                            if (data.length === 0) {
                                data = context.find('h1.globalPageTitle').filter(':first');
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
                                        const idx = data.toLowerCase().indexOf(' for ');
                                        if (idx > 0) {
                                            data = data.slice(0, idx);
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
                type: 'sufaPeopleApp',
                version: '2.4',
                formParentFilter: function (context) {
                    return wmjQuery('body').children("[class*='sapPeopleProfileApp']");
                },
                formFilter: function (context) {
                    context = wmjQuery(context);
                    let forms = context.find('#content');
                    if (forms.length > 0) return forms;
                },
                indicatorFilter: function (context) {
                    return true;
                },
                activeFilter: function (context) {
                    return wmjQuery(context).filter(':deepui_visible').length !== 0;
                },
                errorFilter: function (context) {
                    return wmjQuery(context).find("div[class*='sapUiPseudoInvisibleText']");
                },
                formErrorFilter: function (context) {
                    const dialog = wmjQuery("div[role='alertdialog']");
                    const header = dialog.find('header');
                    if (
                        header.length === 1 &&
                        header.text().toLowerCase().indexOf('error') > -1
                    ) {
                        return dialog;
                    }
                    return false;
                },
                blockerFilter: function (context) {
                    if (wmjQuery('#orgchart').length > 0) return true;
                    if (parseInt(wmjQuery('.sfCurrentStep').text()) > 3) return true;
                    return false;
                },
                'metaDataFilters': [
                    {
                        name: 'originalTitle',
                        dataFilter: function (context) {
                            context = wmjQuery(context);
                            let data = context
                                .find('h1.pageHeaderTitle.sapMTitle')
                                .filter(':first');
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
                                        const delimiters = [
                                            ' for ',
                                            ' of ',
                                            ' - ',
                                            ' : ',
                                            ': ',
                                        ];
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

        ];
        a['cb-uiiFormFilters'](obj);
    }
})(window && window._walkmeInternals);
