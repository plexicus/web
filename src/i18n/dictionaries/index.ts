import en from './en/index';
import es from './es/index';
import it from './it/index';

const dictionaries = {
  en: {
    ...en.nav,
    ...en.hero,
    ...en.remediation_raceI18n,
  },
  es: {
    ...es.nav,
    ...es.hero,
    ...es.remediation_raceI18n,
  },
  it: {
    ...it.nav,
    ...it.hero,
    ...es.remediation_raceI18n,
  },
};
export default dictionaries;