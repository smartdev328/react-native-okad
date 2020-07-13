/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {View} from 'react-native';

import {useSelector} from 'react-redux';
import {setAction} from '@redux/actions';
import {Icon} from 'react-native-elements';

import type {ThemeStyle as StyleType} from '@root/utils/styles';
import {useStyles, useTheme} from '@global/Hooks';

import {Contact, TableHeaderType} from '@utils/types';

import {
  AppHeader,
  AppGradButton,
  AppSearchInput,
  AppTextButton,
  AppText,
  AppDataTable,
} from '@root/components';

const HEADERS: TableHeaderType[] = [
  {label: 'Name', value: 'name', sortable: false, style: {width: 150}},
  {label: 'Location', value: 'location', sortable: true, style: {flex: 1}},
  {
    label: 'Phone Number',
    value: 'phoneNumber',
    sortable: true,
    style: {flex: 1},
  },
  {label: '', value: 'actions', sortable: false, style: {flex: 1}},
];

const mockContacts = [
  {
    name_first: 'Song',
    name_last: 'Bao',
    phone_mobile: '(555) 555-5555',
    location: 'Charlotte, NC',
  },
  {
    name_first: 'Roy',
    name_last: 'Smith',
    phone_mobile: '(555) 555-5555',
    location: 'Chrotte, NC',
  },
  {
    name_first: 'Ben',
    name_last: 'Smith',
    phone_mobile: '(555) 555-5555',
    location: 'Chrotte, NC',
  },
];

export default function Contacts() {
  const {themeStyle} = useTheme();
  const {styles} = useStyles(getStyles);

  const contacts = useSelector((state: any) => state.contacts);
  const contactsSortOps = contacts.sortOp;

  const [searchText, setSearchText] = React.useState<string | undefined>('');

  React.useEffect(() => {
    // fetchContact()
    setAction('contacts', {
      contacts: mockContacts,
    });
  }, [contactsSortOps]);

  const onNamePress = React.useCallback(() => {
    // handler
  }, []);
  const onSortChanged = React.useCallback((sortOp) => {
    setAction('contacts', {sortOp});
  }, []);
  const cellContent = (header: TableHeaderType, row: Contact) => {
    switch (header.value) {
      case 'name':
        return (
          <AppTextButton onPress={onNamePress}>
            <AppText color={'textPurple'} size={20} font={'anBold'}>
              <>
                {row.name_first} {row.name_last}
              </>
            </AppText>
          </AppTextButton>
        );
      case 'location':
        return <AppText size={20}>{row.location}</AppText>;
      case 'phoneNumber':
        return <AppText size={20}>{row.phone_mobile}</AppText>;
      case 'actions':
        return (
          <AppTextButton
            style={styles.agreementsBtn}
            leftIconContent={
              <Icon
                color={themeStyle.textPurple}
                name={'pluscircleo'}
                type={'antdesign'}
                size={20}
              />
            }>
            <AppText color={'textPurple'} size={20} font={'anBold'}>
              Agreements
            </AppText>
          </AppTextButton>
        );
      default:
        return <></>;
    }
  };

  const renderCell = React.useCallback(
    (header: TableHeaderType, row: Contact) => cellContent(header, row),
    [contacts],
  );

  return (
    <View style={styles.container}>
      <AppHeader
        leftContent={null}
        rightContent={null}
        pageTitle={'Contacts'}
        toolbarCenterContent={
          <View style={styles.flexlayout}>
            <AppGradButton
              title={'NEW'}
              leftIconContent={
                <Icon
                  name={'ios-add-circle'}
                  type="ionicon"
                  color={themeStyle.textWhite}
                />
              }
            />
          </View>
        }
        toolbarRightContent={
          <AppSearchInput
            value={searchText}
            onChange={(text: string) => setSearchText(text)}
          />
        }
      />

      <AppDataTable
        headers={HEADERS}
        sortOp={contactsSortOps}
        renderCell={renderCell}
        rows={contacts.contacts}
        onSortChanged={onSortChanged}
      />
    </View>
  );
}

const getStyles = (themeStyle: StyleType) => ({
  container: {
    flex: 1,
    backgroundColor: themeStyle.backgroundWhite,
  },
  text: {
    ...themeStyle.getTextStyle({
      color: 'textBlack',
      font: 'anBold',
      size: 18,
    }),
  },
  agreementsBtn: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  flexlayout: {
    flexDirection: 'row',
  },
});
