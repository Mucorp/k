// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import TextField from '@/components/fields/input';
// import CheckBox from '@/components/fields/checkBox';
// import Grid from '@mui/material/Unstable_Grid2';
// import { useTranslation } from 'react-i18next';
// import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { RoleFormSchema } from '@/utils/schema';

// const constraint = [
//   {
//     constraint: `Signatures`,
//     checkBox: `$`,
//     value: ``,
//   },
//   {
//     constraint: `Simple Electronic Signatures`,
//     checkBox: `$`,
//     value: ``,
//   },
//   {
//     constraint: `Storage (MB)`,
//     checkBox: `$`,
//     value: ``,
//   },
//   {
//     constraint: `Workflows`,
//     checkBox: `$`,
//     value: ``,
//   },
//   {
//     constraint: `Document Upload Size (MB)`,
//     checkBox: `$`,
//     value: ``,
//   },
// ];

// const relations = [
//   {
//     value: `CONFIGURATION`,
//     children: [
//       `GLOBAL_SETTING`,
//       `CONNECTOR`,
//       `AUTHENTICATION_PROFILE`,
//       `CERTIFICATION_PROFILE`,
//       `SIGNING_PROFILE`,
//       `VERIFICATION_PROFILE`,
//       `VIRTUAL_ID_PROFILE`,
//       `PROCESS_EVIDENCE`,
//       `PROCESS_EVIDENCE`,
//       `BILLING_SETTING`,
//       `BRANDING`,
//       `LICENSE`,
//       `DATA_DIRECTORY`,
//       `DATA_SECURITY`,
//       `CONFIGURATION_INSTANCES`,
//       `CONFIGURATION_TERMS_SERVICES`,
//       `SIGNALR`,
//     ],
//   },
//   {
//     value: `SERVICE_PLAN`,
//   },
//   {
//     value: `ACCOUNT`,
//   },
//   {
//     value: `BILLING`,
//   },
//   {
//     value: `ACCESS_CONTROL`,
//   },
//   {
//     value: `ADMIN_LOG`,
//   },
//   {
//     value: `REPORTS`,
//   },
// ];

// const administratorRoleDetail = [
//   {
//     attributeName: `ACCESS_CONTROL`,
//     read: false,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `ACCOUNT`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `ADMIN_LOG`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `AUTHENTICATION_PROFILE`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `BILLING`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `BILLING_SETTING`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `BRANDING`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `CERTIFICATION_PROFILE`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `CONFIGURATION`,
//     read: false,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `CONFIGURATION_INSTANCES`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `CONFIGURATION_TERMS_SERVICES`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `CONNECTOR`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `DATA_DIRECTORY`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `DATA_SECURITY`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `GLOBAL_SETTING`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `LICENSE`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `PROCESS_EVIDENCE`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `REPORTS`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `SERVICE_PLAN`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `SIGNALR`,
//     read: false,
//     addUpdate: false,
//     delete: false,
//   },
//   {
//     attributeName: `SIGNING_PROFILE`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `VERIFICATION_PROFILE`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
//   {
//     attributeName: `VIRTUAL_ID_PROFILE`,
//     read: true,
//     addUpdate: true,
//     delete: true,
//   },
// ];
// const finalResult = [];
// for (let i = 0; i <= administratorRoleDetail?.length; i++) {
//   relations.map((rel) => {
//     // console.log(`attributeName==>`, administratorRoleDetail[i]);
//     if (rel.value === administratorRoleDetail[i]?.attributeName) {
//       finalResult.push(administratorRoleDetail[i]);
//     }
//     // if(rel.value === `CONFIGURATION`){
//     //   {
//     //     value: `CONFIGURATION`,

//     //     children:[]
//     //   }
//     // }
//     else {
//       if (
//         rel?.children?.map(
//           (el) => el == administratorRoleDetail[i]?.attributeName,
//         )
//       ) {
//         finalResult.map((res, j) => {
//           if (res?.attributeName === rel?.value) {
//             // debugger;
//             const temping = [];
//             let curr = { ...res };
//             if (!curr?.children) {
//               curr = { ...res, children: [] };
//               curr?.children.push(administratorRoleDetail[i]);
//             } else {
//               curr?.children.push(administratorRoleDetail[i]);
//             }
//             finalResult[j] = curr;
//           }
//         });
//         // finalResult.push({
//         //   configure: {
//         //     childs: {
//         //       attributeName: administratorRoleDetail[i]?.attributeName,
//         //       read: administratorRoleDetail[i]?.read,
//         //       addUpdate: administratorRoleDetail[i]?.addUpdate,
//         //       delete: administratorRoleDetail[i]?.delete,
//         //     },
//         //   },
//         // });
//       }
//     }
//   });
// }
// console.log(`chkk===>`, finalResult);

// const GridRow = ({ data, index }: any) => {
//   const { t } = useTranslation(`common`);

//   const [formState, setFormState] = React.useState<keysType>({});
//   const {
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(RoleFormSchema),
//     defaultValues: { ...formState },
//   });
//   return (
//     <>
//       <Grid xs={12} md={6}>
//         <div className="flex">
//           <Controller
//             control={control}
//             name={data.attributeName}
//             render={({ field }) => {
//               // console.log(`field===>`, data);
//               return (
//                 <>
//                   <CheckBox
//                     checked={data.all}
//                     onChange={(e: any) => field.onChange(e.target.checked)}
//                     id={`read-${data?.attributeName}`}
//                     fieldRef={field.ref}
//                   />
//                 </>
//               );
//             }}
//           />
//           <Typography variant="p">{t(data[`attributeName`])}</Typography>
//         </div>
//       </Grid>

//       <Grid xs={12} md={2} className="flex justify-center">
//         <Controller
//           control={control}
//           name={data.attributeName}
//           render={({ field }) => {
//             // console.log(field);
//             return (
//               <>
//                 <CheckBox
//                   checked={data?.read}
//                   onChange={(e: any) => field.onChange(e.target.checked)}
//                   id={`read-${data?.attributeName}`}
//                   fieldRef={field.ref}
//                 />
//               </>
//             );
//           }}
//         />
//       </Grid>
//       <Grid xs={12} md={2} className="flex justify-center">
//         <Controller
//           control={control}
//           name={data.attributeName}
//           render={({ field }) => {
//             // console.log(field);
//             return (
//               <>
//                 <CheckBox
//                   checked={data.addUpdate}
//                   onChange={(e: any) => field.onChange(e.target.checked)}
//                   id={`read-${data?.attributeName}`}
//                   fieldRef={field.ref}
//                 />
//               </>
//             );
//           }}
//         />
//       </Grid>
//       <Grid xs={12} md={2} className="flex justify-center">
//         <Controller
//           control={control}
//           name={data.attributeName}
//           render={({ field }) => {
//             // console.log(field);
//             return (
//               <>
//                 <CheckBox
//                   checked={data?.delete}
//                   onChange={(e: any) => field.onChange(e.target.checked)}
//                   id={`read-${data?.attributeName}`}
//                   fieldRef={field.ref}
//                 />
//               </>
//             );
//           }}
//         />
//       </Grid>
//     </>
//   );
// };

// export default function RoleDetails() {
//   const { t } = useTranslation(`common`);
//   const [formState, setFormState] = React.useState<keysType>({});
//   const {
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(RoleFormSchema),
//     defaultValues: { ...formState },
//   });
//   return (
//     <Box>
//       <Box>
//         <Grid
//           container
//           rowSpacing={1}
//           columnSpacing={{ xs: 1, sm: 1, md: 1 }}
//           sx={{
//             borderBottom: `2px solid #dee2e6`,
//             padding: `.875rem 2.3125rem .875rem 1.25rem`,
//           }}
//         >
//           <Grid xs={12} md={6}>
//             <Typography variant="h5">Allowed Modules</Typography>
//           </Grid>
//           <Grid xs={12} md={2} className="flex justify-center">
//             <Typography variant="h5">Read</Typography>
//           </Grid>
//           <Grid xs={12} md={2} className="flex justify-center">
//             <Typography variant="h5">Add/Edit</Typography>
//           </Grid>
//           <Grid xs={12} md={2} className="flex justify-center">
//             <Typography variant="h5">Delete</Typography>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box className="h-screen overflow-hidden pb-96 overflow-y-auto">
//         {administratorRoleDetail.map((item, i) => {
//           return (
//             <Grid
//               key={i}
//               container
//               rowSpacing={1}
//               columnSpacing={{ xs: 1, sm: 1, md: 1 }}
//               sx={{
//                 borderBottom: `1px solid #ebebeb`,
//                 padding: `.875rem 2.3125rem .875rem 1.25rem`,
//               }}
//             >
//               <GridRow data={item} index={i} />
//             </Grid>
//           );
//         })}
//       </Box>
//     </Box>
//   );
// }

/* eslint-disable */
import { useEffect, useState } from 'react';

interface Node {
  label: string;
  value: string;
  isSelected: boolean;
  isDisabled: boolean;
  isCollapsed: boolean;
  children: Node[];
}
const data: Node = {
  value: 'root',
  label: 'root',
  isSelected: false,
  isDisabled: false,
  isCollapsed: false,
  children: [
    {
      label: 'Level A1',
      value: 'Level A1',
      isSelected: false,
      isDisabled: false,
      isCollapsed: false,
      children: [
        {
          label: 'Level B1',
          value: 'Level B1',
          isSelected: false,
          isDisabled: false,
          isCollapsed: false,
          children: [
            {
              label: 'Level C1',
              value: 'Level C1',
              isSelected: false,
              isDisabled: true,
              isCollapsed: false,
              children: [
                {
                  label: 'Level D1',
                  value: 'Level D1',
                  isSelected: false,
                  isDisabled: false,
                  isCollapsed: false,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const relations = [
  {
    value: `CONFIGURATION`,
    children: [
      `GLOBAL_SETTING`,
      `CONNECTOR`,
      `AUTHENTICATION_PROFILE`,
      `CERTIFICATION_PROFILE`,
      `SIGNING_PROFILE`,
      `VERIFICATION_PROFILE`,
      `VIRTUAL_ID_PROFILE`,
      `PROCESS_EVIDENCE`,
      `PROCESS_EVIDENCE`,
      `BILLING_SETTING`,
      `BRANDING`,
      `LICENSE`,
      `DATA_DIRECTORY`,
      `DATA_SECURITY`,
      `CONFIGURATION_INSTANCES`,
      `CONFIGURATION_TERMS_SERVICES`,
      `SIGNALR`,
    ],
  },
  {
    value: `SERVICE_PLAN`,
  },
  {
    value: `ACCOUNT`,
  },
  {
    value: `BILLING`,
  },
  {
    value: `ACCESS_CONTROL`,
  },
  {
    value: `ADMIN_LOG`,
  },
  {
    value: `REPORTS`,
  },
];

const administratorRoleDetail = [
  {
    attributeName: `ACCESS_CONTROL`,
    read: false,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `ACCOUNT`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `ADMIN_LOG`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `AUTHENTICATION_PROFILE`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `BILLING`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `BILLING_SETTING`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `BRANDING`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `CERTIFICATION_PROFILE`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `CONFIGURATION`,
    read: false,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `CONFIGURATION_INSTANCES`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `CONFIGURATION_TERMS_SERVICES`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `CONNECTOR`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `DATA_DIRECTORY`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `DATA_SECURITY`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `GLOBAL_SETTING`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `LICENSE`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `PROCESS_EVIDENCE`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `REPORTS`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `SERVICE_PLAN`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `SIGNALR`,
    read: false,
    addUpdate: false,
    delete: false,
  },
  {
    attributeName: `SIGNING_PROFILE`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `VERIFICATION_PROFILE`,
    read: true,
    addUpdate: true,
    delete: true,
  },
  {
    attributeName: `VIRTUAL_ID_PROFILE`,
    read: true,
    addUpdate: true,
    delete: true,
  },
];

function traverseAndToggleNode(
  data: Node[],
  value: string,
  key: 'isSelected' | 'isDisabled' | 'isCollapsed' = 'isSelected',
) {
  let toggled = false;

  if (data) {
    data.forEach((node) => {
      if (node.value === value) {
        node[key] = !node[key];
        toggled = true;
      }
    });

    if (!toggled) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { data: newChildren, toggled } = traverseAndToggleNode(
          node.children,
          value,
        );
        if (toggled) {
          node.children = newChildren;
          break;
        }
      }
    }
  }
  return { data, toggled };
}

function toggleNodeSelected(value: string, setData: any): void {
  setData((data: Node) => {
    const { data: newChildren, toggled } = traverseAndToggleNode(
      data.children,
      value,
    );
    const newData = { ...data, children: newChildren };
    return newData;
  });
}

function setAllChildren(node: Node, value: boolean) {
  let flat: Node[] = getFlattedChildren(node);

  flat.forEach((child: Node) => {
    child.isSelected = value;
  });
}

function traverseAndToggleNodeChildren(data: Node[], value: string) {
  let toggled = false;
  data.forEach((node) => {
    if (node.value === value) {
      toggled = true;
      let newValue = true;
      // If all selected, change them to false
      if (isAllSelected(node)) {
        newValue = false;
      }

      node.isSelected = newValue;
      setAllChildren(node, newValue);
    }
  });

  if (!toggled) {
    for (let i = 0; i < data.length; i++) {
      let node = data[i];
      const { data: newChildren, toggled } = traverseAndToggleNodeChildren(
        node.children,
        value,
      );
      node.children = newChildren;
      if (toggled) {
        break;
      }
    }
  }

  return { data, toggled };
}

function toggleAllChildren(value: string, setData: any) {
  setData((data: Node) => {
    const { data: newChildren } = traverseAndToggleNodeChildren(
      data.children,
      value,
    );
    const newData = { ...data, children: newChildren };
    return newData;
  });
}

export function CheckItem({
  node,
  setData,
}: {
  node: Node;
  setData: (node: Node) => void;
}) {
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          // border: "1px solid red"
        }}
      >
        <label style={{ color: node.isDisabled ? 'gray' : 'black' }}>
          <input
            type="checkbox"
            checked={node.isSelected}
            disabled={node.isDisabled}
            onChange={(evt) => {
              toggleNodeSelected(node.value, setData);
            }}
          />
          <span>{node.label}</span>
        </label>
        <div>
          <input
            type="checkbox"
            disabled={node.isDisabled}
            onChange={() => toggleAllChildren(node.value, setData)}
            checked={isAllSelected(node)}
          />
        </div>
      </div>
      <div style={{ paddingLeft: '16px', paddingTop: '8px' }}>
        <NestedChecklist data={node.children} setData={setData} />
      </div>
    </div>
  );
}

export function getSelectedValues(data: Node[]): string[] {
  return [];
}
export function NestedChecklist({
  data,
  setData,
}: {
  data: Node[];
  setData: (node: Node) => void;
}) {
  return (
    <>
      {data.map((node) => (
        <CheckItem node={node} setData={setData} />
      ))}
    </>
  );
}

function isAllSelected(node: Node) {
  let allSelected = true;

  let flat: Node[] = getFlattedChildren(node);

  flat.forEach((child: Node) => {
    if (!child.isSelected) {
      allSelected = false;
    }
  });

  return allSelected;
}
function isAllConfigurationSelected(node: Node) {
  let allConfigurationSelected = true;

  let flat: Node[] = getFlattedChildren(node);

  flat.forEach((child: Node) => {
    if (!child.isSelected) {
      allConfigurationSelected = false;
    }
  });

  return allConfigurationSelected;
}

function getFlattedChildren(node: Node): Node[] {
  let flat = [node];
  node.children.forEach((child) => {
    flat = [...flat, ...getFlattedChildren(child)];
  });
  return flat;
}

export default function App() {
  const [checklistData, setChecklistData] = useState<Node>(data);
  const allSelected = isAllSelected(checklistData);
  const allConfigurationSelected = isAllConfigurationSelected(checklistData);
  console.log('allSelected: ', allSelected);

  useEffect(() => {
    const nodes = getFlattedChildren(checklistData);
    const selected: string[] = [];
    nodes.forEach((node) => {
      if (node.isSelected) {
        selected.push(node.value);
      }
    });
    console.log('These are the selected nodes: ', selected);
    // Here is where you would call an onSelect callback with these values
  }, [checklistData]);
  return (
    <div className="App" style={{ width: '180px' }}>
      <div style={{ display: 'flex', paddingBottom: '16px' }}>
        <label>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() => {
              setChecklistData((data) => {
                const flat = getFlattedChildren(data);
                flat.forEach((node) => {
                  node.isSelected = !allSelected;
                });
                return { ...data };
              });
            }}
          />
          <span>{allSelected ? 'Deselect all' : 'Select All'}</span>
        </label>
      </div>
      <NestedChecklist
        data={checklistData.children}
        setData={setChecklistData}
      />
    </div>
  );
}
