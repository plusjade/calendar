export default {
  app: {
    display: 'flex',
    width: '100%',
  },
  headerWrap: {
    height: '4vh',
  },
  headerTable: {
    borderSpacing: 12,
    marginLeft: 35,
  },
  entriesPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  dayCard: {
    flex: 1,
    // minHeight: '15vh',
    display: 'flex',
    flexDirection: 'column',
    // borderBottom: '1px solid #e0e0e0',
    // backgroundColor: '#FFF',
    // margin: '5px 10px',
    borderRadius: 5,
  },
  dayPanel: {
    height: '96vh',
    width: 30,
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    backgroundColor: '#f5f5f5',
  },
  dayWrap: {
    flex: 1,
    width: '100%',
    display: 'flex',
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: 10,
    textTransform: 'uppercase',
    transform: 'rotate(90deg) translate(-40px,0px)',
    transformOrigin: '-25px',
    color: '#616161',
  },
  hashtag: {
    padding: '2px 4px',
    backgroundColor: '#757575',
    borderRadius: 3,
    margin: '0 3px',
  },
  dayHeading: {
    fontWeight: 'bold',
    padding: 10,
    textTransform: 'uppercase',
    color: '#616161',
  },
  entryCard: {
    margin: '5px 0 5px 5px',
    display: 'flex',
    overflow: 'scroll',
    backgroundColor: '#424242',
  },
  entryRow: {
    flex: 1,
    minWidth: '25vw',
    // border: '1px solid red',
    boxSizing: 'border-box',
    padding: 10,
    marginRight: 5,
  },
  categoryRow: {
    backgroundColor: '#212121', color: '#616161',
  },
  TextRow: {
  },
  TagsRow: {
  },

}
