// import { useValidateStore } from '@/store/useValidateStore';
// import { ValidationError } from '@tanstack/react-form'
// export const FieldValidate = ({ errors, name }: { errors: ValidationError[], name: string }) => {
//     const errorStoreData = useValidateStore(s => s.errors)
//     // console.log('-----errors-------', errors);
//     // if (errors.length === 0 && !errorStoreData[name]) return null;

//     // 合并本地错误信息和存储中的错误信息
//     const allErrors = [
//         ...errors,
//         ...(errorStoreData[name] ? [new ValidationError({ message: errorStoreData[name] })] : [])
//     ];

//     // 如果没有错误信息，返回 null 不进行渲染
//     if (allErrors.length === 0) {
//         return null;
//     }

//     return (
//         <div className="border bg-muted px-3 py-1 text-xs text-accent-foreground mt-2 rounded-sm">
//             {/* {errors.join('')} */}
//             {/* {errors.map((error, index) => (
//                 <div key={index}>{error.message}</div>
//             ))} */}
//             {allErrors.map((error, index) => (
//                 <div key={index}>{error.message}</div>
//             ))}
//         </div>
//     )
// }

import React, { useMemo } from 'react';
import { useValidateStore } from '@/store/useValidateStore';
import { ValidationError } from '@tanstack/react-form';

interface FieldValidateProps {
    errors: ValidationError[];
    name: string;
}

export const FieldValidate: React.FC<FieldValidateProps> = ({ errors, name }) => {
    const errorStoreData = useValidateStore(s => s.errors);

    const errorMessages = useMemo(() => {
        if (errors.length === 0 && !errorStoreData[name]) return null;
        return errors.map((error, index) => (
            <div key={index}>{error.message}</div>
        ));
    }, [errors, errorStoreData, name]);

    if (!errorMessages) return null;

    return (
        <div className="border bg-muted px-3 py-1 text-xs text-accent-foreground mt-2 rounded-sm">
            {errorMessages}
        </div>
    );
};