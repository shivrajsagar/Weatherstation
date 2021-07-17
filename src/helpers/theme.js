import {useColorScheme} from 'react-native';

import {useSelector} from 'react-redux';
import {theme as colorScheme} from '../constants';

export default function getColorTheme() {
  const scheme = useColorScheme();
  const theme = useSelector(state => state.theme.theme);
  const colors = theme ? colorScheme.dark : colorScheme[scheme];
  return colors;
}
