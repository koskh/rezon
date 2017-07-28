// // @flow
// import React from 'react';
//
// import PendingIndicator from '../../PendingIndicator';
//
// type Props = {
//     fetch: Function,
//     dumpReduxComponent: {
//         isFetching: boolean,
//         data?: any
//     }
//     // children?: React.Children
// }
// //
// // type DefaultProps = {
// //     fetch: Function,
// //     dumpReduxComponent: State,
// //     children: React.Children
// // };
//
// class DumpReduxComponent extends React.Component {
//     props: Props;
//
//     // static defaultProps: DefaultProps = {
//     //     fetch: () => {},
//     //     dumpReduxComponent: {},
//     //     children: null
//     // };
//
//     componentDidMount() {
//         this.props.fetch();
//         // debugger;
//     }
//
//
//     render() {
//         const { data, isFetching } = this.props.dumpReduxComponent;
//
//         return (
//           <section className="row">
//             <PendingIndicator pending={isFetching}>
//                 Загруженна информация
//             </PendingIndicator>
//           </section>
//         );
//     }
// }
//
// export default DumpReduxComponent;
