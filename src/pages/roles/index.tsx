import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@/components/input/index";
import CheckBox from "@/components/checkBox/index";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cloneDeep } from "lodash";

const constraint = [
  {
    constraint: `Signatures`,
    checkBox: `$`,
    value: ``,
  },
  {
    constraint: `Simple Electronic Signatures`,
    checkBox: `$`,
    value: ``,
  },
  {
    constraint: `Storage (MB)`,
    checkBox: `$`,
    value: ``,
  },
  {
    constraint: `Workflows`,
    checkBox: `$`,
    value: ``,
  },
  {
    constraint: `Document Upload Size (MB)`,
    checkBox: `$`,
    value: ``,
  },
];

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
    attributeName: `CONFIGURATION`,
    read: false,
    addUpdate: true,
    delete: true,
  },
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
  { attributeName: `ADMIN_LOG`, read: true, addUpdate: true, delete: true },
  {
    attributeName: `BILLING`,
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

const configurtionChildrens = [
  `all-auth-profile`,
  `all-billing-setting`,
  `all-branding`,
  `all-cert-profile`,
  `all-con-instance`,
  `all-con-terms`,
  `all-configuration`,
  `all-connector`,
  `all-data-directory`,
  `all-global`,
  `all-license`,
  `all-process-evidence`,
  `all-sign-profile`,
  `all-signalr`,
  `all-veri-profile`,
  `all-virtual-id-profile`,
  `delete-auth-profile`,
  `delete-billing-setting`,
  `delete-branding`,
  `delete-cert-profile`,
  `delete-con-instance`,
  `delete-con-terms`,
  `delete-configuration`,
  `delete-connector`,
  `delete-data-directory`,
  `delete-global`,
  `delete-license`,
  `delete-process-evidence`,
  `delete-sign-profile`,
  `delete-signalr`,
  `delete-veri-profile`,
  `delete-virtual-id-profile`,
  `read-auth-profile`,
  `read-billing-setting`,
  `read-branding`,
  `read-cert-profile`,
  `read-con-instance`,
  `read-con-terms`,
  `read-configuration`,
  `read-connector`,
  `read-data-directory`,
  `read-global`,
  `read-license`,
  `read-process-evidence`,
  `read-sign-profile`,
  `read-signalr`,
  `read-veri-profile`,
  `read-virtual-id-profile`,
  `update-auth-profile`,
  `update-billing-setting`,
  `update-branding`,
  `update-cert-profile`,
  `update-con-instance`,
  `update-con-terms`,
  `update-configuration`,
  `update-connector`,
  `update-data-directory`,
  `update-global`,
  `update-license`,
  `update-process-evidence`,
  `update-sign-profile`,
  `update-signalr`,
  `update-veri-profile`,
  `update-virtual-id-profile`,
];

// export const GridRow = ({ data, isChild }: any) => {
//   const { t } = useTranslation(`common`);

//   const [formState, setFormState] = React.useState({});

//   return (
//     <>
//       <Grid className={isChild ? `ml-3` : ``} xs={12} md={6}>
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
//                     onChange={(e: any) => {
// field.onChange(e.target.checked);
// handleChange(e)
//                           }
//                           }
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
//                   onChange={(e: any) => {
// field.onChange(e.target.checked);
// handleChange(e)
//                           }
//                           }
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
//                   onChange={(e: any) => {
// field.onChange(e.target.checked);
// handleChange(e)
//                           }
//                           }
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
//                   onChange={(e: any) => {
// field.onChange(e.target.checked);
// handleChange(e)
//                           }
//                           }
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

export default function RoleDetails(props) {
  const [formState, setFormState] = React.useState<keysType>({});
  const { data } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { ...formState },
  });

  const finalResult = [];
  for (let i = 0; i <= administratorRoleDetail?.length; i++) {
    relations.map((rel) => {
      // console.log(`attributeName==>`, administratorRoleDetail[i]);
      if (rel.value === administratorRoleDetail[i]?.attributeName) {
        const attributeDetail = {
          ...administratorRoleDetail[i],
          isChecked: true,
        };
        finalResult.push(attributeDetail);
      } else {
        // if (administratorRoleDetail[i]?.attributeName === 'BILLING_SETTING') {
        //   // console.log('rel?.children==>', rel?.children)
        //   // debugger
        // }
        if (
          rel?.children?.length &&
          rel.children.indexOf(administratorRoleDetail[i]?.attributeName) !== -1
        ) {
          finalResult.map((res, j) => {
            if (res?.attributeName == rel?.value) {
              let curr = { ...res };
              if (!curr?.children?.length) {
                curr = { ...res, children: [] };
                const attributeDetails = {
                  ...administratorRoleDetail[i],
                  isChecked: true,
                };
                curr?.children.push(attributeDetails);
              } else {
                const attributeDetails = {
                  ...administratorRoleDetail[i],
                  isChecked: true,
                };
                curr?.children.push(attributeDetails);
              }
              finalResult[j] = curr;
            }
          });
        }
      }
    });
  }
  console.log(`cell Data===>`, data);

  const [parsedData, setParsedData] = React.useState(finalResult);

  const toggleChecksForParent = (dat: any, type: string) => {
    let tempChildren = [];
    const tempBoxes = cloneDeep(parsedData);
    tempBoxes.map((box, i) => {
      if (box.attributeName === dat.attributeName) {
        const tempData = { ...dat };
        tempData.isChecked = !dat.isChecked;
        tempBoxes[i] = tempData;
        box?.children?.map((chil, j) => {
          tempChildren = cloneDeep(box.children);
          const tempBoxChildren = cloneDeep(chil);
          tempBoxChildren.isChecked = !dat?.isChecked;

          if (type === `read`) {
            tempBoxChildren.read = !dat?.read;
          }
          if (type === `update`) {
            tempBoxChildren.addUpdate = !dat?.addUpdate;
          }
          if (type === `delete`) {
            tempBoxChildren.delete = !dat?.delete;
          }
          if (type === `all_actions`) {
            tempBoxChildren.read = !dat?.read;
            tempBoxChildren.addUpdate = !dat?.addUpdate;
            tempBoxChildren.delete = !dat?.delete;
          }

          tempChildren[j] = { ...tempBoxChildren };
          tempBoxes[i].children[j] = tempBoxChildren;
        });
      } else {
        box?.children?.map((chil, j) => {
          if (chil.attributeName === dat?.attributeName) {
            tempChildren = cloneDeep(box.children);
            const tempBoxChildren = cloneDeep(chil);
            tempBoxChildren.isChecked = !dat?.isChecked;

            if (type === `read`) {
              debugger;
              tempBoxChildren.read = !dat?.read;
            }
            if (type === `update`) {
              tempBoxChildren.addUpdate = !dat?.addUpdate;
            }
            if (type === `delete`) {
              tempBoxChildren.delete = !dat?.delete;
            }
            if (type === `all_actions`) {
              tempBoxChildren.read = !dat?.read;
              tempBoxChildren.addUpdate = !dat?.addUpdate;
              tempBoxChildren.delete = !dat?.delete;
            }
            tempChildren[j] = { ...tempBoxChildren };
            tempBoxes[i].children[j] = tempBoxChildren;
          }
        });
      }
    });

    setParsedData(tempBoxes);
  };
  React.useEffect(() => {
    console.log(parsedData);
  }, [parsedData]);

  // React.useEffect(() => {
  //   console.log(`formState===>`, watch());
  //   const values = watch();

  //   if (values[`all-configuration`]) {
  //     const temp = {};

  //     for (const key of configurtionChildrens) {
  //       temp[key] = true;
  //     }

  //     reset(temp);
  //   }
  // }, [watch()]);

  const handleChange = (e) => {

    console.log('eeee===>', e)
    console.log(`formState===>`, watch());
    const values = watch();

    if (e?.target?.id === `all-configuration` && e.target.checked) {
      const temp = {};

      for (const key of configurtionChildrens) {
        temp[key] = true;
      }

      reset(temp);
    }
    if (e?.target?.id === `all-configuration` && !e.target.checked) {

      const temp = {};

      for (const key of configurtionChildrens) {
        temp[key] = false;
      }

      reset(temp);
    }
    if (e?.target?.id !== `all-configuration` && !e?.target?.id.includes('configuration')) {
      // debugger
      let temp = cloneDeep(values)
      for (const key of configurtionChildrens) {
        console.log('key===>', key.split('all-')[1])
        if (key === e?.target?.id && e?.target?.id?.includes('all')) {
          temp[`read-${key.split('all-')[1]}`] = e.target.checked
          temp[`delete-${key.split('all-')[1]}`] = e.target.checked
          temp[`update-${key.split('all-')[1]}`] = e.target.checked
          temp[key] = e.target.checked
          debugger
          console.log('temp====>', temp)
        }
        if (key === e?.target?.id && e?.target?.id?.includes('read')) {
          temp[`read-${key.split('all-')[1]}`] = e.target.checked
          if (!e.target.checked) {
            temp[`all-${key.split('read-')[1]}`] = false
          }
          if (e.target.checked && temp[`read-${key.split('all-')[1]}`] === true &&
            temp[`delete-${key.split('all-')[1]}`] === true &&
            temp[`update-${key.split('all-')[1]}`] === true &&
            temp[key] === true) {

            temp[`all-${key.split('read-')[1]}`] = e.target.checked

          }

        }
        if (key === e?.target?.id && e?.target?.id?.includes('update')) {
          temp[`update-${key.split('all-')[1]}`] = e.target.checked
          if (!e.target.checked) {
            temp[`all-${key.split('update-')[1]}`] = false
          }
          if (e.target.checked && temp[`read-${key.split('all-')[1]}`] === true &&
            temp[`delete-${key.split('all-')[1]}`] === true &&
            temp[`update-${key.split('all-')[1]}`] === true) {

            temp[`all-${key.split('update-')[1]}`] = e.target.checked

          }

        }
        if (key === e?.target?.id && e?.target?.id?.includes('delete')) {
          temp[`delete-${key.split('all-')[1]}`] = e.target.checked
          if (!e.target.checked) {
            temp[`all-${key.split('delete-')[1]}`] = false
          }
          if (e.target.checked && temp[`read-${key.split('all-')[1]}`] === true &&
            temp[`delete-${key.split('all-')[1]}`] === true &&
            temp[`update-${key.split('all-')[1]}`] === true) {

            temp[`all-${key.split('delete-')[1]}`] = e.target.checked

          }

        }

      }
      // let find = Object.keys(temp).some((k) => !k)
      // if (find) {
      //   temp['all-configuration'] = false
      // }
      // else {
      //   temp['all-configuration'] = true
      // }
      // temp['all-configuration'] = false
      reset(temp);

    }

  }

  return (
    <Box>
      <Box>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          sx={{
            borderBottom: `2px solid #dee2e6`,
            padding: `.875rem 2.3125rem .875rem 1.25rem`,
          }}
        >
          <Grid xs={12} md={6}>
            <Typography variant="h5">Allowed Modules</Typography>
          </Grid>
          <Grid xs={12} md={2} className="flex justify-center">
            <Typography variant="h5">Read</Typography>
          </Grid>
          <Grid xs={12} md={2} className="flex justify-center">
            <Typography variant="h5">Add/Edit</Typography>
          </Grid>
          <Grid xs={12} md={2} className="flex justify-center">
            <Typography variant="h5">Delete</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className="h-screen overflow-hidden pb-96 overflow-y-auto">
        <>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-configuration`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={async (e: any) => {
                            await field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-configuration`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">CONFIGURATIONS</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-configuration`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read`}
                        fieldRef={field.ref}
                        disabled
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-configuration`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={async (e: any) => {
                          await field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-configuration`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-configuration`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-configuration`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-global`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-global`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">GLOBAL_SETTING</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-global`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-global`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-global`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-global`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-global`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-connector`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-connector`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">CONNECTOR</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-connector`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-connector`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-connector`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-connector`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-connector`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-connector`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-auth-profile`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-auth-profile`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">AUTHENTICATION_PROFILE</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-auth-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-auth-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-auth-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-auth-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-auth-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-auth-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-cert-profile`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-cert-profile`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">CERTIFICATION_PROFILE</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-cert-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-cert-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-cert-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-cert-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-cert-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-cert-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-sign-profile`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-sign-profile`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">SIGNING_PROFILE</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-sign-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-sign-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-sign-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-sign-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-sign-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-sign-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-veri-profile`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-veri-profile`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">VERIFICATION_PROFILE</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-veri-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-veri-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-veri-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-veri-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-veri-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-veri-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-virtual-id-profile`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-virtual-id-profile`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">VIRTUAL_ID_PROFILE</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-virtual-id-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-virtual-id-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-virtual-id-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-virtual-id-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-virtual-id-profile`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-virtual-id-profile`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-process-evidence`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-process-evidence`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">PROCESS_EVIDENCE</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-process-evidence`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-process-evidence`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-process-evidence`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-process-evidence`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-process-evidence`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-process-evidence`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-billing-setting`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-billing-setting`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">BILLING_SETTING</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-billing-setting`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-billing-setting`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-billing-setting`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-billing-setting`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-billing-setting`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-billing-setting`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-branding`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-branding`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">BRANDING</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-branding`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-branding`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-branding`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-branding`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-branding`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-branding`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-license`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-license`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">LICENSE</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-license`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-license`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-license`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-license`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-license`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-license`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-data-directory`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-data-directory`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">DATA_DIRECTORY</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-data-directory`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-data-directory`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-data-directory`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-data-directory`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-data-directory`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-data-directory`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-con-instance`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-con-instance`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">DATA_SECURITY</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-con-instance`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-con-instance`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-con-instance`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-con-instance`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-con-instance`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-con-instance`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-con-instance`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-con-instance`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">CONFIGURATION_INSTANCES</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-con-instance`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-con-instance`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-con-instance`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-con-instance`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-con-instance`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-con-instance`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-con-terms`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-con-terms`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">
                  CONFIGURATION_TERMS_SERVICES
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-con-terms`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-con-terms`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-con-terms`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-con-terms`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-con-terms`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-con-terms`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="ml-2 mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-signalr`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-signalr`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">SIGNALR</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-signalr`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read-signalr`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-signalr`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-signalr`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-signalr`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-signalr`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-service-plan`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-service-plan`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">SERVICE_PLAN</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-service-plan`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read`}
                        fieldRef={field.ref}
                        disabled
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-service-plan`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-service-plan`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-service-plan`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-service-plan`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-account`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-account`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">ACCOUNT</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-account`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read`}
                        fieldRef={field.ref}
                        disabled
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-account`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-account`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-account`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-account`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-billing`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-billing`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">BILLING</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-billing`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read`}
                        fieldRef={field.ref}
                        disabled
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-billing`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-billing`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-billing`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-billing`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-access-control`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-access-control`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">ACCESS_CONTROL</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-access-control`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read`}
                        fieldRef={field.ref}
                        disabled
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-access-control`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-access-control`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-access-control`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-access-control`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-admin-control`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-admin-control`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">ADMIN_LOG</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-admin-control`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read`}
                        fieldRef={field.ref}
                        disabled
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-admin-control`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-admin-control`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-admin-control`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-admin-control`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className="mt-2 px-3 border-b border-gray-200"
          >
            <Grid item xs={12} md={6}>
              <div className="flex justify-start">
                <Controller
                  control={control}
                  name={`all-reports`}
                  render={({ field }) => {
                    // console.log(`field===>`, field);
                    return (
                      <>
                        <CheckBox
                          checked={field.value}
                          onChange={(e: any) => {
                            field.onChange(e.target.checked);
                            handleChange(e)
                          }
                          }
                          id={`all-reports`}
                          fieldRef={field.ref}
                        />
                      </>
                    );
                  }}
                />
                <Typography variant="body1">REPORTS</Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`read-reports`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`read`}
                        fieldRef={field.ref}
                        disabled
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`update-reports`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`update-reports`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} className="flex justify-center">
              <Controller
                control={control}
                name={`delete-reports`}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        onChange={(e: any) => {
                          field.onChange(e.target.checked);
                          handleChange(e)
                        }
                        }
                        id={`delete-reports`}
                        fieldRef={field.ref}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
        </>
      </Box>
    </Box>
  );
}
