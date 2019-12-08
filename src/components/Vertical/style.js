export default {
  app: {
    display: 'flex',
    width: '100%',
  },
  listWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  dayCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 5,
  },
  listHeading: {
    display: 'flex',
    justifyContent: 'flex-end',
    // borderBottom: '1px solid #BDBDBD',
    marginTop: 5,
  },
  listHeadingText: {
    // fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#9E9E9E',
    padding: '4px 10px',
    // backgroundColor: '#BDBDBD',
    // borderRadius: '5px 0 0 5px',
    borderBottom: '1px solid #9E9E9E',
  },
  entryCard: {
  },
  entryRow: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  categoryRow: {
    margin: '7px 0',
    fontSize: 10,
    padding: '2px 6px 2px 12px',

    display: 'inline-block',
    // borderRadius: '0 3px 3px 0',
    // backgroundColor: '#BDBDBD',
    color: '#9E9E9E',
    borderBottom: '1px solid #9E9E9E',
  },
  TextRow: {
    margin: '5px 12px 0 12px',
  },
  entryTextWrap: {
    display: 'flex',
    backgroundColor: '#F5F5F5',
    borderRadius: 7,
    boxSizing: 'border-box',
  },
  entryTextTag: {
    backgroundColor: '#CCCC',
    padding: 10,
    fontSize: 12,
    borderRadius: '7px 0 0 7px',
    boxSizing: 'border-box',
    fontWeight: 600,
  },
  entryText: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    fontSize: 12,
    borderRadius: '7px 7px 0 0',
    boxSizing: 'border-box',
  },

  entryTags: {
    backgroundColor: '#EEEEEE',
    boxSizing: 'border-box',
    borderRadius: ' 0 0 7px 7px',
    // borderBottom: '1px solid rgba(0, 0, 0, .1)',
    // borderLeft: '1px solid rgba(0, 0, 0, .1)',
    // borderRight: '1px solid rgba(0, 0, 0, .1)',
  },
  tagsWrap: {
    marginTop: 3,
    minHeight: 20,
    padding: '0 3px',
    display: 'flex',
    alignItems: 'center',
  },
  hashtag: {
    padding: '2px 4px',
    borderRadius: 5,
    marginRight: 3,
    fontSize: 11,
    color: '#616161',
    fontWeight: 600,
    // backgroundColor: '#FFFDE7',
  },
  navigationWrap: {
    display: 'flex',
    borderBottom: '1px solid #616161',
    alignItems: 'center',
  },
  navtab: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    color: '#616161',
  },
  navtabSettings: {
    textAlign: 'right',
  },
  dateNavigationWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  navtabDate: {
    padding: 10,
  },
}
