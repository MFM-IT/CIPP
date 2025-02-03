import { useCallback } from 'react';
import PropTypes from 'prop-types';
import AdjustmentsHorizontalIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon';
import { Box, Button, Divider, Stack, SvgIcon, Tab, Tabs } from '@mui/material';
import { BulkActionsMenu } from '../../../components/bulk-actions-menu';
import { FilterDialog } from '../../../components/filter-dialog';
import { QueryField } from '../../../components/query-field';
import { useDialog } from '../../../hooks/use-dialog';
import {
  containsOperator,
  endsWithOperator,
  equalsOperator,
  greaterThanOperator,
  isAfterOperator,
  isBeforeOperator,
  isBlankOperator,
  isPresentOperator,
  lessThanOperator,
  notContainsOperator,
  notEqualOperator,
  startsWithOperator
} from '../../../utils/filter-operators';

const viewOptions = [
  {
    label: 'Show all',
    value: 'all'
  },
  {
    label: 'Ongoing',
    value: 'ongoing'
  },
  {
    label: 'Paid',
    value: 'paid'
  },
  {
    label: 'Overdue',
    value: 'overdue'
  }
];

const filterProperties = [
  {
    label: 'Ref',
    name: 'ref',
    operators: [
      'contains',
      'endsWith',
      'equals',
      'notContains',
      'startsWith',
      'isBlank',
      'isPresent'
    ]
  },
  {
    label: 'Status',
    name: 'status',
    operators: [
      'contains',
      'endsWith',
      'equals',
      'notContains',
      'startsWith',
      'isBlank',
      'isPresent'
    ]
  },
  {
    label: 'Payment Method',
    name: 'paymentMethod',
    operators: [
      'contains',
      'endsWith',
      'equals',
      'notContains',
      'startsWith',
      'isBlank',
      'isPresent'
    ]
  },
  {
    label: 'Total',
    name: 'totalAmount',
    operators: ['equals', 'greaterThan', 'lessThan', 'notEqual', 'isBlank', 'isPresent']
  },
  {
    label: 'Issue Date',
    name: 'issueDate',
    operators: ['isAfter', 'isBefore', 'isBlank', 'isPresent']
  },
  {
    label: 'Due Date',
    name: 'dueDate',
    operators: ['isAfter', 'isBefore', 'isBlank', 'isPresent']
  }
];

const filterOperators = [
  containsOperator,
  endsWithOperator,
  equalsOperator,
  greaterThanOperator,
  isAfterOperator,
  isBeforeOperator,
  isBlankOperator,
  isPresentOperator,
  lessThanOperator,
  notContainsOperator,
  notEqualOperator,
  startsWithOperator
];

export const InvoicesSearch = (props) => {
  const {
    disabled = false,
    filters = [],
    onFiltersApply,
    onFiltersClear,
    onQueryChange,
    onViewChange,
    query = '',
    selected = [],
    view = 'all'
  } = props;
  const filterDialog = useDialog();

  const handleFiltersApply = useCallback((filters) => {
    filterDialog.handleClose();
    onFiltersApply?.(filters);
  }, [filterDialog, onFiltersApply]);

  const handleFiltersClear = useCallback(() => {
    filterDialog.handleClose();
    onFiltersClear?.();
  }, [filterDialog, onFiltersClear]);

  const hasSelection = selected.length > 0;
  const hasFilters = filters.length > 0;

  return (
    <>
      <div>
        <Box
          sx={{
            px: {
              sm: 3
            }
          }}
        >
          <Tabs
            onChange={(event, value) => onViewChange?.(value)}
            value={view}
            variant="scrollable"
          >
            {viewOptions.map((option) => (
              <Tab
                disabled={disabled}
                key={option.label}
                label={option.label}
                value={option.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={2}
          sx={{ p: 3 }}
        >
          {hasSelection && (
            <BulkActionsMenu
              disabled={disabled}
              selectedCount={selected.length}
              sx={{
                order: {
                  xs: 3,
                  sm: 1
                }
              }}
            />
          )}
          <QueryField
            disabled={disabled}
            placeholder="Search..."
            onChange={onQueryChange}
            sx={{
              flexGrow: 1,
              order: {
                xs: 1,
                sm: 2
              }
            }}
            value={query}
          />
          <Button
            disabled={disabled}
            onClick={filterDialog.handleOpen}
            size="large"
            startIcon={(
              <SvgIcon fontSize="small">
                <AdjustmentsHorizontalIcon />
              </SvgIcon>
            )}
            sx={{ order: 2 }}
            variant={hasFilters ? 'contained' : 'text'}
          >
            Filter
          </Button>
        </Stack>
      </div>
      <FilterDialog
        filters={filters}
        onApply={handleFiltersApply}
        onClear={handleFiltersClear}
        onClose={filterDialog.handleClose}
        open={filterDialog.open}
        operators={filterOperators}
        properties={filterProperties}
      />
    </>
  );
};

InvoicesSearch.propTypes = {
  disabled: PropTypes.bool,
  filters: PropTypes.array,
  onFiltersApply: PropTypes.func,
  onFiltersClear: PropTypes.func,
  onQueryChange: PropTypes.func,
  onViewChange: PropTypes.func,
  query: PropTypes.string,
  selected: PropTypes.array,
  view: PropTypes.oneOf(['all', 'ongoing', 'paid', 'overdue'])
};
