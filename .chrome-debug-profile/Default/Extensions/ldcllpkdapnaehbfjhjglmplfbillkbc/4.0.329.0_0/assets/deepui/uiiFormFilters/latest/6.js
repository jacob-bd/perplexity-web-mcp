(function (a) {
    if (a && typeof a['cb-uiiFormFilters'] !== 'undefined') {
        var obj = {};
        obj.uiiFormFilters = [
            {
                type: 'lightningConsole',
                version: '2.0.4',
                formParentFilter: function (context) {
                    return wmjQuery('div.tabsetBody');
                },
                formFilter: function (context) {
                    let tabForm = wmjQuery(
                        '.slds-template__container .oneRecordActionWrapper h2',
                        context,
                    );
                    if (tabForm.length > 0) {
                        tabForm = tabForm
                            .filter('.inlineTitle,.slds-modal__title')
                            .closest('section.oneConsoleTab');
                        if (tabForm.length >= 1) {
                            return tabForm;
                        }
                    }
                    return wmjQuery();
                },
                indicatorFilter: function (context) {
                    const indicator = wmjQuery(context).find(
                        'h2.inlineTitle,h2.slds-modal__title',
                    );
                    if (indicator.length === 1) {
                        return indicator[0];
                    }
                    return null;
                },
                activeFilter: function (context) {
                    if (wmjQuery(context).filter(':deepui_visible').length === 0)
                        return false;
                    const innerTabActive = context.classList.contains('active');
                    const outerTab = wmjQuery(context)
                        .parent()
                        .closest('section.oneConsoleTab');
                    const outerTabParent = outerTab.parent('[role=main]');
                    if (outerTab.length === 1) {
                        return (
                            innerTabActive &&
                            outerTab[0].classList.contains('active') &&
                            outerTabParent.length === 1
                        );
                    }
                },
                errorFilter: function (context) {
                    return wmjQuery(
                        '.slds-form-element__help, .form-element__help',
                        context,
                    ).filter(':deepui_visible');
                },
                formErrorFilter: function (context) {
                    return wmjQuery('.pageErrorHeader,.genericError').filter(
                        ':deepui_visible',
                    );
                },
                blockerFilter: function (context) {
                    const inputs = wmjQuery(context)
                        .find('input')
                        .filter(':deepui_visible');
                    if (inputs.length < 2) {
                        return true;
                    }
                    if (wmjQuery('.sendMailQuickAction', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.reportsExportDialog', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.runtime_sales_mergeMergeFlow', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.forceChangeOwnerContent', context).length >= 1) {
                        return true;
                    }
                    if (
                        wmjQuery('.runtime_sales_leadConvertDesktop', context).length >= 1
                    ) {
                        return true;
                    }
                    if (wmjQuery('.sfaOpportunitySplitMultiEdit', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.forceMultiEdit', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.emailuiSendListEmailAction', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.recordsRecordShare', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.cCARMCustomerNoteInterface', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.forceMultiAddUsingLVM', context).length >= 1) {
                        return true;
                    }
                    return false;
                },
                'metaDataFilters': [
                    {
                        name: 'appName',
                        dataFilter: function (context) {
                            return wmjQuery('.appName').text();
                        },

                    },
                    {
                        name: 'originalTitle',
                        dataFilter: function (context) {
                            context = wmjQuery(context);
                            let candidateTitles = context
                                .find('h2')
                                .filter('.slds-modal__title:deepui_visible');
                            if (candidateTitles.length === 0) {
                                candidateTitles = context
                                    .find('h2.inlineTitle')
                                    .filter(':deepui_visible');
                            }
                            if (candidateTitles.length === 0) {
                                candidateTitles = context
                                    .find(
                                        "h1:not(:parent(div[class*='text-area'])),h2:not([lightning-calendar_calendar])",
                                    )
                                    .filter(':deepui_visible');
                            }
                            const candidateTitle = candidateTitles.first();
                            const candidateTitleText = candidateTitle.text();
                            if (!candidateTitleText) return '';
                            else if (
                                candidateTitleText.toLowerCase().indexOf('new') === 0 ||
                                candidateTitleText.toLowerCase().indexOf('create') === 0
                            ) {
                                return candidateTitleText;
                            }
                        },

                    },

                ],
            },
            {
                type: 'lightningModal',
                version: '2.0.4',
                formParentFilter: function (context) {
                    return wmjQuery('body');
                },
                formFilter: function (context) {
                    const selectorsArray = ['.slds-modal', '.cNewOpportunityCustom'];
                    for (filter of selectorsArray) {
                        let formCandidate = wmjQuery(filter, context);
                        if (formCandidate.length > 0) {
                            return formCandidate.filter(':deepui_visible');
                        }
                    }
                    return wmjQuery();
                },
                indicatorFilter: function (context) {
                    let indicator = wmjQuery(context)
                        .find('h2')
                        .filter(
                            '.title,.inlineTitle,.slds-modal__title,.slds-text-heading_medium,.slds-card__header-title',
                        );
                    if (indicator.length === 1) {
                        return indicator[0];
                    }
                    indicator = wmjQuery(context)
                        .find('div.title')
                        .filter(':deepui_visible');
                    if (indicator.length === 1) {
                        return indicator[0];
                    }
                    indicator = wmjQuery("[class*='slds-tabs_scoped__item slds-is-active']:contains('Notes')", context)
                    if (indicator.length === 1) {
                        return indicator[0];
                    }
                    return null;
                },
                activeFilter: function (context) {
                    context = wmjQuery(context);
                    if (context.filter(':deepui_visible').length === 0) return false;
                    const uiModal = context.closest('.uiModal');
                    if (uiModal.length === 0) return true;
                    const uiContainerManager = uiModal.closest('.uiContainerManager');
                    const lastOpenModal = uiContainerManager.find('.uiModal').last();
                    if (lastOpenModal.is(uiModal)) {
                        return true;
                    }
                    return false;
                },
                errorFilter: function (context) {
                    return wmjQuery(
                        '.slds-form-element__help, .form-element__help',
                        context,
                    ).filter(':deepui_visible');
                },
                formErrorFilter: function (context) {
                    let snag = wmjQuery('.pageErrorHeader').filter(':deepui_visible');
                    if (
                        snag.length === 1 &&
                        snag.closest('.uiPanel').prev().is(context.closest('.uiModal'))
                    ) {
                        return snag;
                    }
                    return wmjQuery('.genericError', context).filter(':deepui_visible');
                },
                blockerFilter: function (context) {
                    const inputs = wmjQuery(context)
                        .find('input,textarea')
                        .not('[type="radio"]')
                        .filter(':deepui_visible');
                    const notesTab = wmjQuery("[class*='slds-tabs_scoped__item slds-is-active']:contains('Notes')", context)
                    if (inputs.length > 0 && notesTab.length > 0) {
                        return false;
                    }
                    if (inputs.length < 2) {
                        return true;
                    }
                    if (wmjQuery('.sendMailQuickAction', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.reportsExportDialog', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.runtime_sales_mergeMergeFlow', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.forceChangeOwnerContent', context).length >= 1) {
                        return true;
                    }
                    if (
                        wmjQuery('.runtime_sales_leadConvertDesktop', context).length >= 1
                    ) {
                        return true;
                    }
                    if (wmjQuery('.sfaOpportunitySplitMultiEdit', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.forceMultiEdit', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.emailuiSendListEmailAction', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.recordsRecordShare', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.cCARMCustomerNoteInterface', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('.forceMultiAddUsingLVM', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('div[c-customersuccessconsolemodal_customersuccessconsolemodal]', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('c-c360-create-action-plan-manual', context).length >= 1) {
                        return true;
                    }
                    if (wmjQuery('div.cLxSendEmail', context).length >= 1) {
                        return true;
                    }
                    return false;
                },
                'metaDataFilters': [
                    {
                        name: 'appName',
                        dataFilter: function (context) {
                            return wmjQuery('.appName').text();
                        },

                    },
                    {
                        name: 'originalTitle',
                        dataFilter: function (context) {
                            context = wmjQuery(context);
                            let candidateTitles = context.find('h1:not([lightning-calendar_calendar])').filter(':deepui_visible');
                            if (candidateTitles.length === 0) {
                                candidateTitles = context.find("[class~='modal-header']>[class*=slds-text-heading]").filter(':deepui_visible');
                            }
                            if (candidateTitles.length === 0) {
                                candidateTitles = context.find('h2').filter('.slds-modal__title,.slds-text-heading_medium').filter(':deepui_visible');
                            }
                            if (candidateTitles.length === 0) {
                                candidateTitles = context.find('[class~=title]').filter(':deepui_visible');
                            }
                            if (candidateTitles.length === 0) {
                                candidateTitles = context.find('h2:not([lightning-calendar_calendar])').filter(':deepui_visible');
                            }
                            const candidateTitle = candidateTitles.first();
                            const candidateTitleText = candidateTitle.text();
                            if (!candidateTitleText) return '';
                            else if (
                                candidateTitleText.toLowerCase().indexOf('new') === 0 ||
                                candidateTitleText.toLowerCase().indexOf('create') === 0
                            ) {
                                return candidateTitleText;
                            }
                        },

                    },

                ],
            },
            {
                type: 'lightningInPage',
                version: '2.0.4',
                formParentFilter: function (context) {
                    return wmjQuery("div[role='main']");
                },
                formFilter: function (context) {
                    const formCandidate = wmjQuery(
                        'flexipage-component2[slot="main"][data-component-id="flexipage_tabset"]',
                        context,
                    );
                    if (formCandidate.length === 1) {
                        let indicator = formCandidate.find(
                            'div.slds-clearfix.detail-panel-root.slds-card.footer-visible',
                        );
                        if (indicator.length) {
                            return formCandidate;
                        }
                        indicator = formCandidate.find(
                            'div.field-section2.slds-card',
                        );
                        if (indicator.length) {
                            return formCandidate;
                        }
                    }
                    return wmjQuery();
                },
                indicatorFilter: function (context) {
                    let indicator = wmjQuery(context).find(
                        'div.slds-clearfix.detail-panel-root.slds-card.footer-visible',
                    );
                    if (indicator.length) {
                        return indicator[0];
                    }
                    indicator = wmjQuery(context).find(
                        'div.field-section2.slds-card',
                    );
                    if (indicator.length) {
                        return indicator[0];
                    }
                    return null;
                },
                activeFilter: function (context) {
                    context = wmjQuery(context);
                    return context.filter(':deepui_visible').length === 1;
                },
                errorFilter: function (context) {
                    return wmjQuery(context)
                        .find('.slds-form-element__help')
                        .filter(':deepui_visible');
                },
                formErrorFilter: function (context) {
                    return wmjQuery('div[role="dialog"].forceFormPageError');
                },
                blockerFilter: function (context) {
                    const inputs = wmjQuery(context)
                        .find('input')
                        .filter(':deepui_visible');
                    return inputs.length < 2;
                },
                'metaDataFilters': [
                    {
                        name: 'appName',
                        dataFilter: function (context) {
                            return wmjQuery('.appName').text();
                        },

                    },
                    {
                        name: 'originalTitle',
                        dataFilter: function (context) {
                            context = wmjQuery(context);
                            const candidateTitle = context.find('div.entityNameTitle').filter(':deepui_visible').first();
                            const candidateTitleText = candidateTitle.text();
                            if (!candidateTitleText) return '';
                            else if (
                                candidateTitleText.toLowerCase().indexOf('new') === 0 ||
                                candidateTitleText.toLowerCase().indexOf('create') === 0
                            ) {
                                return candidateTitleText;
                            }
                        },

                    },

                ],
            },

        ];
        a['cb-uiiFormFilters'](obj);
    }
})(window && window._walkmeInternals);
