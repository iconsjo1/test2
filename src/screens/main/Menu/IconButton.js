import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import styles from './styles';
import { Text, TouchableOpacity } from '../../../components';
import { i18n, colors } from '../../../services';
import Collapsible from 'react-native-collapsible';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const iconSize = 25;
const IconButton = ({ children, icon, onPress, subMenu, level = 0, CAPITALIZE }) => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <>
            <TouchableOpacity
                onPress={subMenu ? subMenu.length !== 0 ? () => setCollapsed(!collapsed) : onPress : onPress}
                style={StyleSheet.flatten([
                    styles().buttonContainer,
                    {
                        paddingLeft: level * 15
                    }
                ])}>
                <View style={StyleSheet.flatten([
                    styles().iconContainer,
                    {
                        width: styles().iconContainer.width
                    }
                ])}>
                    {icon ? icon : null}
                </View>
                <Text style={StyleSheet.flatten([
                    styles().buttonText, {
                        textTransform: CAPITALIZE ? 'uppercase' : 'capitalize'
                    }])}>
                    {children}
                </Text>
                {subMenu ? subMenu.length !== 0 ?
                    <View style={styles().rightIcon}>
                        <MaterialIcons name={collapsed ? "keyboard-arrow-down" : "keyboard-arrow-up"} size={iconSize} color={colors.darkGrey} />
                    </View>
                    : null : null}
            </TouchableOpacity>
            {subMenu ? subMenu.length !== 0 ?
                <Collapsible collapsed={collapsed}>
                    {subMenu.map((el, i) => (
                        <IconButton
                            key={i}
                            level={level + 1}
                            CAPITALIZE={el.CAPITALIZE}
                            icon={el.icon ? el.icon : icon}
                            subMenu={el.subMenu}
                            onPress={!Boolean(el.subMenu) ?
                                () => onPress({
                                    TITLE: i18n.locale === 'ar' ? el.A_NAME : el.E_NAME,
                                    image: el.image,
                                    DESCRIPTION: i18n.locale === 'ar' ? el.A_DESCRIPTION : el.E_DESCRIPTION,
                                    SHOWASHTML: el.SHOWASHTML,
                                    iconDetail: el.iconDetail ? el.iconDetail : {}
                                })
                                :
                                onPress} >
                            {i18n.locale === 'ar' ? el.A_NAME : el.E_NAME}
                        </IconButton>
                    ))}
                </Collapsible>
                : null : null}
        </>
    )
}

export default IconButton;
