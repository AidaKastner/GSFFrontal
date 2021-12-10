import React, { useState, Fragment } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import StorageIcon from '@mui/icons-material/Storage';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DescriptionIcon from '@mui/icons-material/Description';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useTranslation } from 'react-i18next';
import { Translation } from 'react-i18next';


export const SidebarData = [
    
    {
        title: <Translation ns= "global">{(t) => <>{t('gestTram')}</>}</Translation>,
        icon: <DirectionsCarIcon />,
        path: '/menu',

        subNav: [
            {
                title: <Translation ns= "global">{(t) => <>{t('impGraf')}</>}</Translation>,
                path:'/menu'
            },
            {
                title: <Translation ns= "global">{(t) => <>{t('verEditCyT')}</>}</Translation>,
                path:'/VerEditCarTram'
            },
            {
                title: <Translation ns= "global">{(t) => <>{t('verEditDicT')}</>}</Translation>,
                path:'/VerEditTram'
            },
            {
                title: <Translation ns= "global">{(t) => <>{t('impAf')}</>}</Translation>,
                path:'/VerImpAfor'
            },
            {
                title: <Translation ns= "global">{(t) => <>{t('impAc')}</>}</Translation>,
                path:'/CargarActuaciones'
            },
        ],
    },
    {
        title: <Translation ns= "global">{(t) => <>{t('gestAusc')}</>}</Translation>, 
        icon: <CarRepairIcon />,
        path: '/menu'
    },
    {
        title: <Translation ns= "global">{(t) => <>{t('comsDat')}</>}</Translation>, 
        icon: <StorageIcon />,
        path: '/menu'
    },
    {
        title: <Translation ns= "global">{(t) => <>{t('Clasif')}</>}</Translation>,
        icon: <LibraryBooksIcon />,
        path: '/menu'
    },
    {
        title: <Translation ns= "global">{(t) => <>{t('Evol')}</>}</Translation>,
        icon: <ShowChartIcon />,
        path: '/menu'
    },
    {
        title: <Translation ns= "global">{(t) => <>{t('Admin')}</>}</Translation>,
        icon: <AdminPanelSettingsIcon />,
        path: '/menu'
    },
    {
        title: <Translation ns= "global">{(t) => <>{t('Docum')}</>}</Translation>, 
        icon: <DescriptionIcon />,
        path: '/menu'
    },
    {
        title: <Translation ns= "global">{(t) => <>{t('CerrarSes')}</>}</Translation>,
        icon: <ExitToAppIcon />,
        path: '/'
    },
    
];
