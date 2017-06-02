// function rubyLookup(textData, fieldType){

//     var allJSON = [envJSON,relJSON,intJSON];

//     for (thisJSON of allJSON){
//         console.log(thisJSON);
//         for(item of thisJSON){
//             console.log(textData,item);

//             switch(fieldType){
//             case 'A':
//                 break;
//             case 'P':
//                 break;
//             case 'V':
//                 break;
//             }
//         }
//     }
    

//     return textData;

// }


// function rubyClean(textData, releaseName){

//     //Tags
//     textData = textData.replace("<%= @version %>","{Release}");
//     textData = textData.replace("<%= rel_key %>","{Release}");
//     textData = textData.replace("<%= @ole_env_key['deploy_version'] %>","{Release}");
//     textData = textData.replace("<%= env_key %>","columbus-{ENVID}");
//     textData = textData.replace("<%= @ole_env_key['env'] %>","{ENVID}");
//     textData = textData.replace("<%= @ole_env_key['sub_env'] %>","{EnvType}");
//     textData = textData.replace("<%= int_key %>","talend_interfaces_{Release}");

//     textData = textData.replace("<%= @ole_env_key['brg_server'] %>","{ServerName|BRG}");
//     textData = textData.replace("<%= @ole_env_key['db_server'] %>","{ServerName|PMS Oracle Database}");
//     textData = textData.replace("<%= @ole_env_key['eas_server'] %>","{ServerName|EAS}");
//     textData = textData.replace("<%= @ole_env_key['uis_server'] %>","{ServerName|UIS}");

//     textData = textData.replace("<%= @ole_env_key['db_user'] %>","PMS{ENVID}");
//     textData = textData.replace("<%= @ole_env_key['db_pass'] %>","PMS{ENVID}");
//     textData = textData.replace("<%= @ole_env_key['db_stg_user'] %>","PMS{ENVID}_STG");
//     textData = textData.replace("<%= @ole_env_key['db_stg_pass'] %>","PMS{ENVID}_STG");
//     textData = textData.replace("<%= @ole_env_key['fullmig_db_user'] %>","FULLMIG{ENVID}");
//     textData = textData.replace("<%= @ole_env_key['fullmig_db_pass'] %>","FULLMIG{ENVID}");
//     textData = textData.replace("<%= @ole_env_key['optimus_db_user'] %>","OPTMIG{ENVID}");
//     textData = textData.replace("<%= @ole_env_key['optimus_db_pass'] %>","OPTMIG{ENVID}");
//     textData = textData.replace("<%= @ole_env_key['stockplus_db_pass'] %>","STKMIG{ENVID}");
//     textData = textData.replace("<%= @ole_env_key['stockplus_db_user'] %>","STKMIG{ENVID}");

//     textData = textData.replace("<%= @ole_env_key['stockplusfm_masterdata_db_pass'] %>","{OverrideMe}");
//     textData = textData.replace("<%= @ole_env_key['stockplusfm_masterdata_db_user'] %>","{OverrideMe}");
//     textData = textData.replace("<%= @ole_env_key['masterdata_db_pass'] %>","{OverrideMe}");
//     textData = textData.replace("<%= @ole_env_key['masterdata_db_user'] %>","{OverrideMe}");
//     textData = textData.replace("<%= @ole_env_key['syscred_password'] %>","{OverrideMe}");
//     textData = textData.replace("<%= @ole_env_key['syscred_passwordIssueDate'] %>","{OverrideMe}");


//     //Fixed Values
//     textData = textData.replace("<%= @ole_env_key['distrib'] %>","EnterpriseLinux");
//     textData = textData.replace("<%= @ole_env_key['release'] %>","1");


//     if (releaseName == '7.4.4'){
//         //Env
//         textData = textData.replace("<%= @ole_env_key['db_version'] %>", '7.4.3');

//         //release
//         textData = textData.replace("<%= rel_versions['brg'] %>", '7.4.3');
//         textData = textData.replace("<%= rel_versions['eas'] %>", '7.4.3');
//         textData = textData.replace("<%= rel_versions['uis'] %>", '7.4.4');
//         textData = textData.replace("<%= rel_versions['pms_version'] %>", '7.4.3');
//         textData = textData.replace("<%= rel_versions['stockplus_version'] %>", '7.4.3');
//         textData = textData.replace("<%= rel_versions['stockplusbridge_version'] %>", '7.4.4');
//         textData = textData.replace("<%= rel_versions['centralfilling_version'] %>", '7.4.3');
//         textData = textData.replace("<%= rel_versions['trainingversion'] %>", '7.4.3');
//         textData = textData.replace("<%= rel_versions['wmqjmsraversion'] %>", '7.0');
//         textData = textData.replace("<%= rel_versions['asmversion'] %>", '1.6.0');
//         textData = textData.replace("<%= rel_versions['eclipsepersistenceversion'] %>", '2.4.2');
//         textData = textData.replace("<%= rel_versions['aclloggingversion'] %>", '3.14');
//         textData = textData.replace("<%= rel_versions['jmxqueryversion'] %>", '1.4');
//         textData = textData.replace("<%= rel_versions['batchclientversion'] %>", '1.6.1');
        
//         //RPM
//         textData = textData.replace("<%= rpm_versions['brg'] %>", '7.4.3-1');
//         textData = textData.replace("<%= rpm_versions['eas'] %>", '7.4.3-1');
//         textData = textData.replace("<%= rpm_versions['uis'] %>", '7.4.4-1');
//         textData = textData.replace("<%= rpm_versions['pms_version'] %>", '7.4.3-1');
//         textData = textData.replace("<%= rpm_versions['stockplus_version'] %>", '7.4.3-1');
//         textData = textData.replace("<%= rpm_versions['stockplusbridge_version'] %>", '7.4.4-1');
//         textData = textData.replace("<%= rpm_versions['centralfilling_version'] %>", '7.4.3-1');
//         textData = textData.replace("<%= rpm_versions['trainingversion'] %>", '7.4.3-1');
//         textData = textData.replace("<%= rpm_versions['wmqjmsraversion'] %>", '7.0-1');
//         textData = textData.replace("<%= rpm_versions['oracle'] %>", '1.0');
//         textData = textData.replace("<%= rpm_versions['oracle_secure'] %>", '1.0');
//         textData = textData.replace("<%= rpm_versions['ehcache'] %>", '1.0');
//         textData = textData.replace("<%= rpm_versions['bouncycastle'] %>", '1.5');
//         textData = textData.replace("<%= rpm_versions['asmversion'] %>", '1.6.0-1');
//         textData = textData.replace("<%= rpm_versions['eclipsepersistenceversion'] %>", '2.4.2-1');
//         textData = textData.replace("<%= rpm_versions['aclloggingversion'] %>", '3.14-1');
//         textData = textData.replace("<%= rpm_versions['jmxqueryversion'] %>", '1.4-1');
//         textData = textData.replace("<%= rpm_versions['batchclientversion'] %>", '1.6.1-1');

//         //Interfaces
//         textData = textData.replace("<%= int_versions['createUpdateActualProductPack']%>",'3.1-1');
//         textData = textData.replace("<%= int_versions['createUpdateAdverseReaction']%>",'3.2-1');
//         textData = textData.replace("<%= int_versions['createUpdateExemption']%>",'3.3-1');
//         textData = textData.replace("<%= int_versions['createUpdateFormulary']%>",'3.0-1');
//         textData = textData.replace("<%= int_versions['createUpdateGeneralParameter']%>",'3.4-1');
//         textData = textData.replace("<%= int_versions['createUpdateLabelInstruction']%>",'3.0-1');
//         textData = textData.replace("<%= int_versions['createUpdateMedicalCondition']%>",'3.0-1');
//         textData = textData.replace("<%= int_versions['createUpdatePractice']%>",'3.3-1');
//         textData = textData.replace("<%= int_versions['createUpdatePreferredActualProductPack']%>",'3.2-1');
//         textData = textData.replace("<%= int_versions['createUpdatePreferredProductSKU']%>",'3.4-1');
//         textData = textData.replace("<%= int_versions['createUpdatePrescriber']%>",'3.2-1');
//         textData = textData.replace("<%= int_versions['createUpdatePrescriberType']%>",'3.0-1');
//         textData = textData.replace("<%= int_versions['createUpdatePrescription']%>",'5.5-1');
//         textData = textData.replace("<%= int_versions['createUpdatePrescription_FM']%>",'6.2-1');
//         textData = textData.replace("<%= int_versions['createUpdatePrescriptionFormType']%>",'3.6-1');
//         textData = textData.replace("<%= int_versions['createUpdatePrescriptionGroup']%>",'3.3-1');
//         textData = textData.replace("<%= int_versions['createUpdateProduct']%>",'3.3-1');
//         textData = textData.replace("<%= int_versions['createUpdateProductBarcode']%>",'3.2-1');
//         textData = textData.replace("<%= int_versions['createUpdateProductFlavour']%>",'3.0-1');
//         textData = textData.replace("<%= int_versions['createUpdateProductLogistics']%>",'3.1-1');
//         textData = textData.replace("<%= int_versions['createUpdateProductSKU']%>",'3.4-1');
//         textData = textData.replace("<%= int_versions['createUpdateRole']%>" ,'2.3-1');
//         textData = textData.replace("<%= int_versions['createUpdateSite']%>",'3.5-1');
//         textData = textData.replace("<%= int_versions['createUpdateStockAvailability']%>",'3.0-1');
//         textData = textData.replace("<%= int_versions['createUpdateStoreServiceCentreLink']%>",'3.0-1');
//         textData = textData.replace("<%= int_versions['createUpdateSupplier']%>",'3.0-1');
//         textData = textData.replace("<%= int_versions['createUpdateTwinningScheme']%>",'0.1-1');
//         textData = textData.replace("<%= int_versions['executeSQL']%>",'2.3-1');
//         textData = textData.replace("<%= int_versions['import_IG01']%>",'1.2-1');
//         textData = textData.replace("<%= int_versions['import_IG02']%>",'1.1-1');
//         textData = textData.replace("<%= int_versions['import_IG03']%>", '3.3-1');
//         textData = textData.replace("<%= int_versions['import_IG04']%>",'1.1-1');
//         textData = textData.replace("<%= int_versions['import_IG06']%>",'1.1-1');
//         textData = textData.replace("<%= int_versions['import_IG09']%>",'1.1-1');
//         textData = textData.replace("<%= int_versions['jobrunner']%>",'2.7-1');
//         textData = textData.replace("<%= int_versions['merge_IG01']%>",'1.3-1');
//         textData = textData.replace("<%= int_versions['merge_IG02']%>",'1.0-1');
//         textData = textData.replace("<%= int_versions['merge_IG03']%>",'1.2-1');
//         textData = textData.replace("<%= int_versions['merge_IG04']%>",'1.2-1');
//         textData = textData.replace("<%= int_versions['merge_IG06']%>",'1.2-1');
//         textData = textData.replace("<%= int_versions['merge_IG09']%>",'1.2-1');
//         textData = textData.replace("<%= int_versions['readPrescriberImsFeed']%>",'1.1-1');
//         textData = textData.replace("<%= int_versions['readPrescriptionImsFeed']%>",'1.1-1');
//         textData = textData.replace("<%= int_versions['tsfn-encryptionutil']%>",'1.2-1');
//         textData = textData.replace("<%= int_versions['OptimusMigration']%>",'1.90-1');
//         textData = textData.replace("<%= int_versions['StockPlus_Migration']%>",'4.25-1');
//         textData = textData.replace("<%= int_versions['StockPlusFM_Migration']%>",'6.11-1');
//         textData = textData.replace("<%= int_versions['StockPlusFM_Migration_Maps']%>",'6.13-1');

              
//     }

//     return textData;

// }

